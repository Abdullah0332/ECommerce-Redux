import * as api from '../api/index';

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants';
import { DELETE_PRODUCT_REQUEST } from '../constants/productConstants';

// Create New Order
export const createOrder = (order) => async (dispatch) => {
    try{

        dispatch({ type: CREATE_ORDER_REQUEST })

        const { data } = await api.postCreateOrder(order);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch(error){
        console.log(error.response)
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Get Currently Logged In User Orders
export const myOrders = () => async (dispatch) => {
    
    try{

        dispatch({ type: MY_ORDERS_REQUEST })

        const { data } = await api.getMyOrders();

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch(error){
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.errMessage
        })
    }

}

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try{

        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { data } = await api.OrderDetails(id);
        
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// All Order (Admin)
export const allOrders = (id) => async (dispatch) => {
    try{

        dispatch({ type: ALL_ORDERS_REQUEST })

        const { data } = await api.getAllOrder();

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Update Order (Admin)
export const updateOrder = (id, orderData) => async (dispatch, getState) => {
    try{

        dispatch({ type: UPDATE_ORDER_REQUEST })

        const { data } = await api.updateOrder(id, orderData);

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch(error){
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Delete Order (Admin)
export const deleteOrder = (id) => async (dispatch, getState) => {
    try{

        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await api.deleteOrder(id);

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch(error){
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}