const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register a user  =>  /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatar',
        width: 150,
        crop: "scale"
    })
    
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    sendToken(user, 200, res);
})

// Login User  =>  /api/v1/login
exports.loginUser = catchAsyncError( async (req, res, next) => {

    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter Email and Password'));
    }

    // Finding user in Database
    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid Email and Password', 401));
    }

    // Check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email and Password', 401));
    }

    sendToken(user, 200, res);

})

// forgot password  =>  /password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if(!user){
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    
    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = ` Your Password Reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try{

        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to : ${user.email}`
        })

    } catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }
})

// Reset Password  =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    
    // Hash URL Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ 
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user){
        return next(new ErrorHandler('Password Reset Token is Invalid or has been Expired', 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400));
    }

    // Setup new Password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})

// Get currently logged in user detail  =>  /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// Update / Change Password  =>  /api/v1/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);

    if(!isMatched) {
        return next(new ErrorHandler('Old Password is incorrect', 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
})

// Update user profile  =>  /api/v1/me/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    // Update avatar
    if(req.body.avatar !== ''){
        const user = await User.findById(req.user.id);

        const image_id = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatar',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar= {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})

// Logout User  =>  /api/v1/logout
exports.logoutUser = catchAsyncError(async(req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})

// Admin routes

// Get all users - ADMIN => /api/v1/admin/users
exports.allUsers = catchAsyncError(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get user detail - ADMIN  =>  /api/v1/admin/user/:id
exports.getUserDetail = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id : ${req.params.id}`), 400);
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update user profile ADMIN  =>  /api/v1/admin/user/:id
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
    
    var newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    
    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})

// Delete User - ADMIN  =>  /api/v1/admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id : ${req.params.id}`), 400);
    }

    // Remove avatar from cloudinary
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    await user.remove();

    res.status(200).json({
        success: true,
        user
    })
})