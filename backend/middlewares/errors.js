const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.status = err.status || 500;

    let error = {...err};

    error.message = err.message;

    // Wrong Mongoose Object ID Error
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`
        error = new ErrorHandler(message, 400)
    }

    // Handle Mongoose Validation Error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorHandler(message, 400)
    }

    // Handle Mongoose Duplicate Key Error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        error = new ErrorHandler(message, 400)
    }

    // Handle wrong JWT error
    if(err.name === 'JsonWebTokenError'){
        const message = 'JSON Web Token is Invalid. Try Again !!!'
        error = new ErrorHandler(message, 400)
    }

    
    // Handle expire JWT error
    if(err.name === 'TokenExpiredError'){
        const message = 'JSON Web Token is Expired. Try Again !!!'
        error = new ErrorHandler(message, 400)
    }

    res.status(error.status).json({
        success: false,
        errMessage: err.message  || 'Internal Server Error',
        error: err,
        stack: err.stack
    })
}