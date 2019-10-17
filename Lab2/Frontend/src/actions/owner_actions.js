import { GET_ORDERS_NEW, GET_ORDERS_OLD, UPDATE_ORDER ,GET_ALLSECTIONS,ADD_SECTION,UPDATE_SECTION,DELETE_SECTION,GET_ALLITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM} from '../actions/types';
import axios from 'axios';

export const getOrders_new = (userid) => async (dispatch) => {
    let updateSectiondata_new = {
        "UserID": userid,
        "type": 'new'
    }
    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/showOrders', updateSectiondata_new)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_ORDERS_NEW,
                    showOrders_new: response.data
                });
            }

        });
}
export const getOrders_old = (userid) => async (dispatch) => {

    let updateSectiondata_old = {
        "UserID": userid,
        "type": 'old'
    }
    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/showOrders', updateSectiondata_old)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_ORDERS_OLD,
                    showOrders_old: response.data
                });
            }
        }
        )
}
export const updateOrder = (updateddata) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:5000/UpdateOrder',updateddata)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_ORDER,
                    showOrders: response.data
                });
            }
        }
        )
}
export const getAllSections = (data) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/getAllSections', data)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_ALLSECTIONS,
                    showMenu: response.data
                });
            }
        }
        )
}
export const addSection = (addeddata) => async (dispatch) => {

    axios.defaults.withCredentials = true;
   await axios.post('http://localhost:5000/addSection', addeddata)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: ADD_SECTION,
                    showMenu: response.data
                });
            }
        }
        )
}
export const updateSection = (updateddata) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/UpdateSection', updateddata)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_SECTION,
                    showMenu: response.data
                });
            }
        }
        )
}
export const deleteSection = (sectiondata) => async (dispatch) => {

    axios.defaults.withCredentials = true;

   await axios.post('http://localhost:5000/deleteSection', sectiondata)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: DELETE_SECTION,
                    showMenu: response.data
                });
            }
        }
        )
}

export const getAllItems = (sectiondata) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/getAllItems',sectiondata)
        .then((response) => {
            if (response.status === 200) {
                console.log("response data of getALLITEMS is "+response.data);
                dispatch({
                    type: GET_ALLITEMS,
                    showItems: response.data
                });
            }
        }
        )
}
export const addItem = (addData) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/addItem',addData)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: ADD_ITEM,
                    showItems: response.data
                });
            }
        }
        )
}
export const updateItem = (updateddata) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/UpdateItem',updateddata)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_ITEM,
                    msg:"updated"
                });
            }
        }
        )
}
export const deleteItem = (data) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/deleteItem',data)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: DELETE_ITEM,
                    msg:"deleted"
                });
            }
        }
        )
}