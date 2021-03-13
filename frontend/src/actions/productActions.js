import axios from 'axios';
import * as api from '../api/index';

import {
    ALL_ADMIN_PRODUCTS_REQUEST,
    ALL_ADMIN_PRODUCTS_SUCCESS,
    ALL_ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    GET_REVIEW_REQUEST,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';

export const getProducts = (keyword = '', currentPage = 1, price, category, rating = 0) => async (dispatch) => {
    try{

        dispatch({ type: ALL_PRODUCTS_REQUEST })

        let link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) {
            link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`

        }

        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
    try{

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await api.getProductDetails(id)
        
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// New Review
export const newReview = (reviewData) => async (dispatch) => {
    try{

        dispatch({ type: NEW_REVIEW_REQUEST })

        const { data } = await api.putNewReview(reviewData)
        
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    }catch(error){
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Get Admin Products
export const getAdminProducts = () => async (dispatch) => {
    try{

        dispatch({ type: ALL_ADMIN_PRODUCTS_REQUEST })

        const { data } = await api.getAdminProducts()
        
        dispatch({
            type: ALL_ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    }catch(error){
        dispatch({
            type: ALL_ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// New Product
export const newProduct = (productData) => async (dispatch) => {
    try{

        dispatch({ type: NEW_PRODUCT_REQUEST })

        const { data } = await api.postNewProduct(productData)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Delete Product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
    try{

        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await api.deleteProduct(id)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    }catch(error){
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Update Product (Admin)
export const updateProduct = (id, productData) => async (dispatch) => {
    try{

        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const { data } = await api.updataProduct(id, productData)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    }catch(error){
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Get Product Reviews (Admin)
export const getProductReviews = (id) => async (dispatch) => {
    try{

        dispatch({ type: GET_REVIEW_REQUEST })

        const { data } = await api.getProductReviews(id)
        
        dispatch({
            type: GET_REVIEW_SUCCESS,
            payload: data.reviews
        })

    }catch(error){
        dispatch({
            type: GET_REVIEW_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Delete Product Review (Admin)
export const deleteReview = (id, productId) => async (dispatch) => {
    try{

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await api.deleteReview(id, productId)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    }catch(error){
        dispatch({
            type: DELETE_REVIEW_FAIL,
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