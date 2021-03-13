import * as api from '../api/index';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants';

// Login
export const login = (email, password) => async (dispatch) => {

    try{

        dispatch({ type: LOGIN_REQUEST })

        const { data } = await api.postLogin(email, password);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
        })

    }catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Register User
export const register = (userData) => async (dispatch) => {

    try {
        
        dispatch({ type: REGISTER_USER_REQUEST })

        const { data } = await api.postRegister(userData);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Load user
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await api.getLoadUser();

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        console.log(error.response)
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {

        await api.getLogOutUser();

        dispatch({
            type: LOGOUT_USER_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Update User Profile
export const updateProfile = (userData) => async (dispatch) => {

    try {
        
        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const { data } = await api.putProfileUpdate(userData);

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Update User Password
export const updatePassword = (passwords) => async (dispatch) => {

    try {
        
        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const { data } = await api.putUpdatePassword(passwords);

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const { data } = await api.postForgotPassword(email);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// New Password
export const resetPassword = (token, passwords) => async (dispatch) => {

    try {
        
        dispatch({ type: NEW_PASSWORD_REQUEST })

        const { data } = await api.postForgotPassword(token, passwords);

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// All User (Admin)
export const allUsers = () => async (dispatch) => {

    try {
        
        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await api.getAllUsers();

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Update User (Admin)
export const updateUser = (id, userData) => async (dispatch) => {

    try {
        
        dispatch({ type: UPDATE_USER_REQUEST })

        const { data } = await api.putUpdateUser(id, userData);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}


// Get User Details (Admin)
export const getUserDetails = (id) => async (dispatch) => {

    try {
        
        dispatch({ type: USER_DETAILS_REQUEST })

        const { data } = await api.getUserDetails(id);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}


// Delete User (Admin)
export const deleteUser = (id) => async (dispatch) => {

    try {
        
        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await api.deleteUser(id);

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
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