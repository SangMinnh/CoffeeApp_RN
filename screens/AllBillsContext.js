import createDataContext from './createDataContext';
import { AllBills } from '../model/data';

const billReducer = (allBillsState, action) => {
    switch (action.type) {
        case 'get_all_bills':
            return action.payload;
        case 'add_new_bill':
            return action.payload;
        case 'get_bills':
            return action.payload;
        default:
            return allBillsState;
    }
};

const addNewBill = dispatch => {
    return async (callback) => {
        // await jsonServer.post('/newbills', { title, content });
        //const response = await jsonServer.get('/blogposts');

        dispatch({ type: 'add_new_bill', payload: response.data });
        if (callback) {
            callback();
        }
    };
};

const getAllBills = dispatch => {
    return async () => {
        //fetch bills data
        // const allBills = await jsonServer.get('/allbills');
        //const allBill = AllBills;
        dispatch({ type: 'get_all_bills', payload: AllBills });
    };
};

export const { Context, Provider } = createDataContext(
    billReducer,
    { getAllBills, addNewBill },
    //{ addToCart, deleteFromCart, editCartItem },
    []
);