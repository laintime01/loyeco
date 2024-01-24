const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const AuthService = require("./auth.service");
const config = require("../../../config");

const Login = catchAsync(async (req, res) => {
    const result = await AuthService.loginUser(req.body);
    const { accessToken } = result;

    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true
    }
    res.cookie('accessToken', accessToken, cookieOptions)
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Logged !!',
        success: true,
        data: result,
    })
})

const Register = catchAsync(async (req, res) => {
    const result = await AuthService.registerUser(req.body);
    sendResponse(res, {
        statusCOde: 200,
        message: 'Successfully Registered !!',
        success: true,
        data: result,
    })
})



module.exports = {
    Login,
    Register
}
