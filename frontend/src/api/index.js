import axios from 'axios';

const url = "http://localhost:5000/api/v1";

const credential = {
    withCredentials: true
}

const config = {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}

const imgConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: true
}

// Product APIs
// Get Product Details
export const getProductDetails = (id) => axios.get(`${url}/product/${id}`);

//PUT New Review
export const putNewReview = (reviewData) => axios.put(`${url}/review`, reviewData, config);

// Get Products (Admin)
export const getAdminProducts = () => axios.get(`${url}/admin/products`);

//Post New Product
export const postNewProduct = (productData) => axios.post(`${url}/admin/product/new`, productData, config);

//Delete Product
export const deleteProduct = (id) => axios.delete(`${url}/admin/product/${id}`, credential);

//Update Product
export const updataProduct = (id, productData) => axios.put(`${url}/admin/product/${id}`, productData, config);

//Get Product Reviews
export const getProductReviews = (id) => axios.get(`${url}/reviews/?id=${id}`, credential);

//Delete Product Review
export const deleteReview = (id, productId) => axios.delete(`${url}/review/?id=${id}&productId=${productId}`, credential);


// User APIs
// Get All Users (Admin)
export const getAllUsers = () => axios.get(`${url}/admin/users`, credential);

// Put Update Users (Admin)
export const putUpdateUser = (id, userData) => axios.put(`${url}/admin/user/${id}`, userData, config);

// Get Users Details (Admin)
export const getUserDetails = (id) => axios.get(`${url}/admin/user/${id}`, credential);

// Get Users Details (Admin)
export const deleteUser = (id) => axios.delete(`${url}/admin/user/${id}`, credential);

// Post Login
export const postLogin = (email, password) => axios.post(`${url}/login`, {email, password}, config);

// Post Register
export const postRegister = (userData) => axios.post(`${url}/register`, userData, imgConfig);

// Get Load User
export const getLoadUser = () => axios.get(`${url}/me`, credential);

// Get Logout User
export const getLogOutUser = () => axios.get(`${url}/logout`, credential);

// Put User Profile Update
export const putProfileUpdate = (userData) => axios.put(`${url}/me/update`, userData, imgConfig);

// Put User Password Update
export const putUpdatePassword = (passwords) => axios.put(`${url}/password/update`, passwords, config);

// Post User Forgot Password
export const postForgotPassword = (email) => axios.post(`${url}/password/forgot`, email, config);

// Put User New Password
export const putResetPassword = (token, passwords) => axios.put(`${url}/password/reset/${token}`, passwords, config);


// Cart APIs
// Get Add To Cart
export const getAddItemToCart = (id) => axios.get(`${url}/product/${id}`);


// Order APIs
// Post Create Order
export const postCreateOrder = (order) => axios.post(`${url}/order/new`, order, config);

// Get Current Logged In User Orders 
export const getMyOrders = () => axios.get(`${url}/orders/me`, credential);

// Get Order Details
export const OrderDetails = (id) => axios.get(`${url}/order/${id}`, credential);

// Get All Order
export const getAllOrder = () => axios.get(`${url}/admin/orders`, credential);

// Put Update Order
export const updateOrder = (id, orderData) => axios.put(`${url}/admin/order/${id}`, orderData, config);

// Delete Order
export const deleteOrder = (id) => axios.delete(`${url}/admin/order/${id}`, credential);