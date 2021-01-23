import createDataContext from './createDataContext';
const axios = require('axios');
import api from './food'
const foodReducer = (state, action) => {
    switch (action.type) {
        case 'get_all_food':
            return action.payload;
        case 'filter_food': {
            return action.payload;
        }

        case 'add_new_bill':
            return action.payload;
        case 'get_bills':
            return action.payload;
        default:
            return state;
    }
};

// const addNewBill = dispatch => {
//     return async (callback) => {
//         // await jsonServer.post('/newbills', { title, content });
//         //const response = await jsonServer.get('/blogposts');

//         dispatch({ type: 'add_new_bill', payload: response.data });
//         if (callback) {
//             callback();
//         }
//     };
// };
const filterFood = dispatch => {
    return async (id) => {
        try {
            const response = await axios.get('http://uitmobile.herokuapp.com/api/Food/get');
            if (id !== 'All') {
                const res = [...response.data.filter(e => e.category === id)]
                dispatch({ type: 'get_all_food', payload: res });
            }
            else dispatch({ type: 'get_all_food', payload: response.data });


        } catch (error) {
            console.error('Get error', error);
        }

    };
};

const getAllFood = dispatch => {
    return async () => {

        try {
            const response = await axios.get('https://uitmobile.herokuapp.com/api/food/get');
            dispatch({ type: 'get_all_food', payload: response.data });
        } catch (error) {
            console.error('Get error:', error);
        }
    };
};

const deleteFood = dispatch => {
    return async (id) => {

        try {
            await axios.delete(`https://uitmobile.herokuapp.com/api/food/delete/${id}`);
            //dispatch({ type: 'get_all_food', payload: response.data });
            console.log("delete")
        } catch (error) {
            console.error('Get error:', error);
        }
    };
};

export const { Context, Provider } = createDataContext(
    foodReducer,
    { getAllFood, filterFood, deleteFood },
    //{ addToCart, deleteFromCart, editCartItem },
    []
);