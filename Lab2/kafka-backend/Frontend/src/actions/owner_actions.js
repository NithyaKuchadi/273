import { GET_ORDERS_NEW, GET_ORDERS_OLD, UPDATE_ORDER, GET_ALLSECTIONS, ADD_SECTION, UPDATE_SECTION, DELETE_SECTION, GET_ALLITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../actions/types';
import axios from 'axios';
import { rooturl } from '../config/settings';
export const getOrders_new = (userid) => async (dispatch) => {
    let updateSectiondata_new = {
        "UserID": userid,
        "type": 'new'
    }
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/showOrders', updateSectiondata_new, config)
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
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/showOrders', updateSectiondata_old, config)
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
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/UpdateOrder', updateddata, config)
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
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/getAllSections', data, config)
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
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/addSection', addeddata, config)
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
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/UpdateSection', updateddata, config)
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
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;

    await axios.post('http://' + rooturl + ':5000/deleteSection', sectiondata, config)
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
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/getAllItems', sectiondata, config)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_ALLITEMS,
                    showItems: response.data
                });
            }
        }
        )
}
export const addItem = (addData) => async (dispatch) => {
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/addItem', addData, config)
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
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/UpdateItem', updateddata, config)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_ITEM,
                    msg: "updated"
                });
            }
        }
        )
}
export const deleteItem = (data) => async (dispatch) => {
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://' + rooturl + ':5000/deleteItem', data, config)
        .then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: DELETE_ITEM,
                    msg: "deleted"
                });
            }
        }
        )
}