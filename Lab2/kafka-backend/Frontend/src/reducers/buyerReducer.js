import { BUYER_RESTAURANT_SEARCH, IMAGE_DOWNLOAD, GET_ITEM, GET_SECTION_ITEMS, ORDER_ITEM, IMAGE_UPLOAD } from '../actions/types';
const initialState = {
    restaurantNames: [],
    restaurant_response: false,
    item: {},
    ItemSections: []
}

export default function (state = initialState, action) {

    switch (action.type) {
        case BUYER_RESTAURANT_SEARCH:
            return {
                ...state,
                restaurantNames: action.payload,
                restaurant_response: action.restaurant_response
            }
        case IMAGE_UPLOAD:
            return {
                ...state,
                imageupload_success: action.imageupload_success
            }
        case IMAGE_DOWNLOAD:
            return {
                ...state,
                imagePreviewresponse: action.imagePreviewresponse
            }
        case GET_ITEM:
            return {
                ...state,
                item: action.item
            }
        case GET_SECTION_ITEMS:
            return {
                ...state,
                ItemSections: action.payload
            }
        case ORDER_ITEM:
            return {
                ...state,
                OrderSuccessfull: action.OrderSuccessfull
            }
        default:
            return state;
    }
}