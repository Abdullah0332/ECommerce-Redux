const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);

router.get('/admin/products', productController.getAdminProducts);

router.get('/product/:id', productController.getSingleProduct);

router.put('/review', isAuthenticatedUser, productController.createProductReview);

router.get('/reviews', isAuthenticatedUser, productController.getProductsReviews);

router.delete('/review', isAuthenticatedUser, productController.deleteReview);

// ADMIN Routes 

router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), productController.newProduct);

router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), productController.updateProduct);

router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), productController.deleteProduct);

module.exports= router;