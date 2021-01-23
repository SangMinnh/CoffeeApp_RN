import createDataContext from './createDataContext';
import { AllBills } from '../model/data';
import axios from 'axios';
const billReducer = (allBillsState, action) => {
    switch (action.type) {
        case 'get_all_bills':
            return action.payload;
        case 'get_bills':
            return action.payload;
        default:
            return allBillsState;
    }
};
const uuidv4 = () => {
    return 'xxx-xxx-4xxx-yxx-xxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const addNewBill = (dispatch) =>
    async (foodCartNow, state, idd, callback) => {
        const d = new Date();
        const n = d.toLocaleString();
        const finalCartNow = { ...foodCartNow, time: n, idCart: idd, status: 'Processing' }
        try {
            await axios.post('http://uitmobile.herokuapp.com/api/foodscart/post', { ...finalCartNow });


        }
        catch (e) {
            console.log('cl1', e)
        }
        try {
            await state.forEach(element => {
                const idEle = uuidv4();
                axios.post('http://uitmobile.herokuapp.com/api/foodscartdetail/post',
                    {
                        idfcdetail: idEle,
                        idfoodscart: idd,
                        idfood: element.id,
                        amount: element.amount,
                        size: element.size
                    });
            });

            if (callback) {
                callback();
            }
        }
        catch (e) {
            console.log('cl2', e)
        }

    };


const getAllBills = dispatch => {
    return async () => {
        try {
            const response = await axios.get('https://uitmobile.herokuapp.com/api/foodscart/get');
            //console.log('aaaaaaaaaaaaaa', response.data);
            dispatch({ type: 'get_all_bills', payload: response.data });
        }
        catch (e) {
            console.log(e)
        }

    };
};

export const { Context, Provider } = createDataContext(
    billReducer,
    { getAllBills, addNewBill },
    []
);