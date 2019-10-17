import { BUYER_RESTAURANT_SEARCH, IMAGE_DOWNLOAD,GET_ITEM ,GET_SECTION_ITEMS, ORDER_ITEM} from '../actions/types';
import axios from 'axios';

export const restaurantNames = (itemName) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/getRestaurantNames', itemName)
        .then(
            async (response) => {
                if (response.status === 200) {
                    console.log("response is 200" + response.data);
                    dispatch({
                        type: BUYER_RESTAURANT_SEARCH,
                        payload: response.data,
                        restaurant_response: true
                    });
                }
                else {
                    console.log("response is 202");
                    dispatch({
                        type: BUYER_RESTAURANT_SEARCH,
                        restaurant_response: false
                    });
                }

            }
        )
}
export const getSectionItems = (restaurantID) => async (dispatch) => {
console.log("In Action, getSectionItems "+restaurantID);
    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/getItemsSections', restaurantID)
        .then(async (response) => {
            console.log("In Action, getSectionItems response data is "+response.data);
                if (response.status === 200) {
                    console.log("response is 200" + response.data);
                    dispatch({
                        type: GET_SECTION_ITEMS,
                        payload: response.data
                    });
                }

            }
        )
}
export const orderItems = (ordereddata) => async (dispatch) => {
    console.log("In Action, getSectionItems "+ordereddata);
    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/OrderItem', ordereddata)
            .then(async (response) => {
                console.log("In Action, orderItems response data is "+response.data);
                    if (response.status === 200) {
                        console.log("response is 200" + response.data);
                        dispatch({
                            type: ORDER_ITEM,
                            OrderSuccessfull: true
                        });
                    }
                    else
                    {
                        dispatch({
                            type: ORDER_ITEM,
                            OrderSuccessfull: false
                        });

                    }
    
                }
            )
    }

export const imageDownload = (image) => async (dispatch) => {
    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/download-file/' + image)
        .then(async (response) => {
           
            dispatch({
                type: IMAGE_DOWNLOAD,
                imagePreviewresponse: response.data
            });
        })
}
export const getItem = (item) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.post('http://localhost:5000/getItemsONItemID', item)
        .then(async (response) => {

                if (response.status === 200) {
                    console.log("response is 200" + response.data);
                    dispatch({
                        type: GET_ITEM,
                        item: response.data,
                        
                    });
                }

            
        })
}
