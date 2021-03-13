// Create and send Token and save it in Cookie
const sendToken = (user, statusCode, res) => {

    // Create JWT Token
    const token = user.getJwtToken();

    // Option for Cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken;