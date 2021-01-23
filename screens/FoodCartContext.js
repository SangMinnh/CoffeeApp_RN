
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
                        image: action.payload.image,
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
        case 'clear_cart':
            {
                return [];
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

const clearCart = dispatch => {
    return async () => {
        dispatch({
            type: 'clear_cart',
        });
    };
}

const addToCart = dispatch => {
    return async (id, price, title, image) => {

        dispatch({ type: 'add_to_cart', payload: { id, price, title, image } });
    };
};

const deleteItem = dispatch => {
    return async (id, callback) => {
        dispatch({ type: 'delete_item', payload: id });
        if (callback) {
            callback();
        }
    };
};


export const { Context, Provider } = createDataContext(
    cartReducer,
    { addToCart, deleteItem, handleItemAmount, clearCart },
    []
);