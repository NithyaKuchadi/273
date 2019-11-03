import { BUYER_RESTAURANT_SEARCH, IMAGE_DOWNLOAD,GET_ITEM ,GET_SECTION_ITEMS, ORDER_ITEM,IMAGE_UPLOAD} from '../actions/types';
import axios from 'axios';
import { rooturl } from '../config/settings';

export const restaurantNames = (itemName) => async (dispatch) => {
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };
    axios.defaults.withCredentials = true;
    await axios.post('http://'+rooturl+':5000/getRestaurantNames', itemName,config)
        .then(
            async (response) => {
                if (response.status === 200) {
                   dispatch({
                        type: BUYER_RESTAURANT_SEARCH,
                        payload: response.data,
                        restaurant_response: true
                    });
                }
                else {
                     dispatch({
                        type: BUYER_RESTAURANT_SEARCH,
                        restaurant_response: false
                    });
                }

            }
        )
}
export const getSectionItems = (restaurantID) => async (dispatch) => {
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };   
axios.defaults.withCredentials = true;
    await axios.post('http://'+rooturl+':5000/getItemsSections', restaurantID,config)
        .then(async (response) => {
            if (response.status === 200) {
                    dispatch({
                        type: GET_SECTION_ITEMS,
                        payload: response.data
                    });
                }

            }
        )
}
export const orderItems = (ordereddata) => async (dispatch) => {
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };   
    axios.defaults.withCredentials = true;
    await axios.post('http://'+rooturl+':5000/OrderItem', ordereddata,config)
            .then(async (response) => {
               if (response.status === 200) {
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

export const imageDownload = (image1) => async (dispatch) => {
    console.log("IN IMAGE DOWNLOAD "+image);
  let image={
      image:image1
  }
  let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    };  
    axios.defaults.withCredentials = true;
    console.log("url IS http://"+rooturl+':5000/download-file/',image);
    await axios.post('http://'+rooturl+':5000/download-file/', image,config)
        .then(async (response) => {
           dispatch({
                type: IMAGE_DOWNLOAD,
                imagePreviewresponse: response.data
            });
        })
}
export const imageUpload = (data) => async (dispatch) => {
 console.log("IN IMAGE UPLOAD "+data);
  
    axios.defaults.withCredentials = true;
   await  axios.post('http://'+rooturl+':5000/upload-file', data) 
   .then(async (response) => {
           dispatch({
                type: IMAGE_UPLOAD,
                imageupload_success:true
            });
        })
}

export const getItem = (item) => async (dispatch) => {
    let token = localStorage.getItem('token');
    var config = {
        headers: {
            'Authorization': "bearer "+token,
            'Content-Type': 'application/json'
        }
    }; 
    axios.defaults.withCredentials = true;
    await axios.post('http://'+rooturl+':5000/getItemsONItemID', item,config)
        .then(async (response) => {

                if (response.status === 200) {
                   dispatch({
                        type: GET_ITEM,
                        item: response.data,
                        
                    });
                }

            
        })
}
