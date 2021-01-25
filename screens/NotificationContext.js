import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
//import jsonServer from '../api/jsonServer';

const notiReducer = (state, action) => {
    switch (action.type) {
        case 'get_all_noti':
            return action.payload;
        case 'delete_noti':

            return action.payload;
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


const addNoti = dispatch => {
    return async (idd, table) => {
        try {
            await axios.post('http://uitmobile.herokuapp.com/api/Notifications/post',
                {
                    idnotification: idd,
                    title: `Table #${table}`,
                    details: `New order from table ${table} are waiting for you! Hurry Up!`
                });

        } catch (error) {
            console.error('post deo dc', error)
        }
        //dispatch({ type: 'add_noti', payload: { id, price, title, image } });
    };
};

const getAllNoti = dispatch => {

    return (response) => {

        dispatch({ type: 'get_all_noti', payload: response });


    };


};

const deleteNoti = dispatch => {
    return async (newData, idnotification) => {
        try {
            await axios.delete(`http://uitmobile.herokuapp.com/api/notifications/delete/${idnotification}`)
        } catch (error) {
            console.error('cc xoa deo dc', error)
        }
        dispatch({ type: 'delete_noti', payload: newData });

    };
};


export const { Context, Provider } = createDataContext(
    notiReducer,
    { addNoti, deleteNoti, getAllNoti },
    []
);