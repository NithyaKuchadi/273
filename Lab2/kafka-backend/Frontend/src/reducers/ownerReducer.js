import { GET_ORDERS_NEW, GET_ORDERS_OLD, UPDATE_ORDER, GET_ALLSECTIONS, ADD_SECTION, UPDATE_SECTION, DELETE_SECTION, GET_ALLITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../actions/types';
const initialState = {

}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS_NEW:
            return {
                ...state,
                showOrders_new: action.showOrders_new
            }
        case GET_ORDERS_OLD:
            return {
                ...state,
                showOrders_old: action.showOrders_old
            }
        case UPDATE_ORDER:
            return {
                ...state,
                showOrders: action.showOrders
            }
        case GET_ALLSECTIONS:
            return {
                ...state,
                showMenu: action.showMenu
            }
        case ADD_SECTION:
            return {
                ...state,
                showMenu: action.showMenu
            }
        case UPDATE_SECTION:
            return {
                ...state,
                showMenu: action.showMenu
            }
        case DELETE_SECTION:
            return {
                ...state,
                showMenu: action.showMenu
            }
        case GET_ALLITEMS:
            return {
                ...state,
                showItems: action.showItems
            }
        case ADD_ITEM:
            return {
                ...state,
                showItems: action.showItems
            }
        case UPDATE_ITEM:
            return {
                ...state,
                msg:action.msg
                
            }
        case DELETE_ITEM:
            return {
                ...state,
                msg:action.msg
                
            }
        default:
            return state;
    }
}