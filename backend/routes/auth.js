const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/password/forgot', authController.forgotPassword);

router.put('/password/reset/:token', authController.resetPassword);

router.get('/logout', authController.logoutUser);

router.get('/me', isAuthenticatedUser, authController.getUserProfile);

router.put('/password/update', isAuthenticatedUser, authController.updatePassword);

router.put('/me/update', isAuthenticatedUser, authController.updateProfile);

// Admin Routes

router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin'), authController.allUsers);

router.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), authController.getUserDetail);

router.put('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), authController.updateUserProfile);

router.delete('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), authController.deleteUser);

module.exports= router;