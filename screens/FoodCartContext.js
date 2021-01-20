
import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';

//import jsonServer from '../api/jsonServer';

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'add_to_cart':
            {
                const index = state.findIndex(x => x.id === action.payload.id);
                if (index < 0) {
                    // console.log(state);
                    return state.concat([{
                        id: action.payload.id,
                        title: action.payload.title,
                        price: action.payload.price,
                        size: "M",
                        amount: 1,
                    }])
                }
                else {
                    const newState = [...state]
                    let aamount = state[index].amount + 1;
                    newState.splice(index, 1, { ...state[index], amount: aamount })
                    console.log(state)
                    return newState;
                }

            }
        case 'handle_amount':
            {
                return [...action.payload]
            }




        //     case 'get_blogposts':
        //         return action.payload;
        //     case 'edit_blogpost':
        //         return state.map(blogPost => {
        //             return blogPost.id === action.payload.id ? action.payload : blogPost;
        //         });
        case 'delete_item':
            console.log('deleted')
            return state.filter(item => item.id !== action.payload);




        default:
            return state;
    }
};

// const getBlogPosts = dispatch => {
//     return async () => {
//         const response = await jsonServer.get('/blogposts');

//         dispatch({ type: 'get_blogposts', payload: response.data });
//     };
// };
const handleItemAmount = dispatch => {
    return async (item) => {
        dispatch({
            type: 'handle_amount',
            payload: item
        });
    };
}



const addToCart = dispatch => {
    return async (id, price, title) => {
        //try {
        //     let value = await AsyncStorage.getItem('cartNow');
        //     if (value == null) {
        //         value = await AsyncStorage.setItem('cartNow', JSON.stringify([{
        //             id, price, title, size: "M",
        //             amount: 1
        //         }]))
        //     }
        //     else {

        //         const index = JSON.parse(value).findIndex(x => x.id === id);
        //         if (index < 0) {
        //             const updatedCart = JSON.parse(value).concat([{
        //                 id,
        //                 title,
        //                 price,
        //                 size: "M",
        //                 amount: 1,
        //             }])
        //             console.log('uppppNowwwwwwww', updatedCart)

        //             AsyncStorage.setItem('cartNow', JSON.stringify(updatedCart))
        //         }
        //         else {

        //         }


        //     }
        // }
        // catch (err) {
        //     console.log(err)
        // }
        //await jsonServer.post('/blogposts', { title, content });
        dispatch({ type: 'add_to_cart', payload: { id, price, title } });

        // if (callback) {  
        //     callback();
        // }
    };
};

const deleteItem = dispatch => {
    return async (id, callback) => {
        //await jsonServer.delete(`/blogposts/${id}`);

        dispatch({ type: 'delete_item', payload: id });
        if (callback) {
            callback();
        }
    };
};

// const editBlogPost = dispatch => {
//     return async (id, title, content, callback) => {
//         await jsonServer.put(`/blogposts/${id}`, { title, content });

//         dispatch({
//             type: 'edit_blogpost',
//             payload: { id, title, content }
//         });
//         if (callback) {
//             callback();
//         }
//     };
// };

export const { Context, Provider } = createDataContext(
    cartReducer,
    { addToCart, deleteItem, handleItemAmount },
    //{ addToCart, deleteFromCart, editCartItem },
    []
);