const bcrypt = require('bcrypt');
const User = require('../../../models/userModel');
const ApiError = require('../../../errors/apiError');
const httpStatus = require('http-status');
const JwtHelper = require('../../../helpers/jwtHelper');
const config = require('../../../config');
const jwt = require('jsonwebtoken');

const loginUser = async (user) => {
    const { email, password } = user;
    // check if user exists
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist !");
        
    }
    // check if password is matched
    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.NOT_FOUND, "Password does not match !");
    }
    // create token
    const { id } = isUserExist;
    console.log(config.jwt.secret)
    const accessToken = JwtHelper.createToken(
        { id },
        config.jwt.secret,
        config.jwt.JWT_EXPIRES_IN
    )
    return { accessToken, user: { id } }
}

module.exports = {
    loginUser
}
