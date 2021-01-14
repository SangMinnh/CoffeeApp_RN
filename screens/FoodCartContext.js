
import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';
//import jsonServer from '../api/jsonServer';

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'add_to_cart':
            {
                const index = state.findIndex(x => x.id === action.payload.id);
                if (index < 0) return state.concat([{
                    amount: 1,
                    id: action.payload.id,
                    idCart: "1",
                    price: action.payload.price,
                    size: "M",
                    title: action.payload.title
                }])
                else {
                    const newState = [...state]
                    let aamount = state[index].amount + 1;
                    newState.splice(index, 1, { ...action.payload, amount: aamount })
                    return newState
                }

            }

        //     case 'get_blogposts':
        //         return action.payload;
        //     case 'edit_blogpost':
        //         return state.map(blogPost => {
        //             return blogPost.id === action.payload.id ? action.payload : blogPost;
        //         });
        case 'delete_item':
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

const addToCart = dispatch => {
    return async (item, callback) => {
        //await jsonServer.post('/blogposts', { title, content });
        try {

            dispatch({ type: 'add_to_cart', payload: item });

        } catch (e) {
            // saving error
            console.log(e)
        }
        if (callback) {
            callback();
        }
    };
};

const deleteItem = dispatch => {
    return async id => {
        // await jsonServer.delete(`/blogposts/${id}`);

        dispatch({ type: 'delete_item', payload: id });
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
    { addToCart, deleteItem },
    //{ addToCart, deleteFromCart, editCartItem },
    []
);