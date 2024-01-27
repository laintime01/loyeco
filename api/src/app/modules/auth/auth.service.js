const bcrypt = require('bcrypt');
const User = require('../../../models/userModel');
const ApiError = require('../../../errors/apiError');
const httpStatus = require('http-status');
const JwtHelper = require('../../../helpers/jwtHelper');
const config = require('../../../config');
const jwt = require('jsonwebtoken');

const loginUser = async (user) => {
    const { email, password } = user;
    // check if user is exist
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !");
    }
    // check if password is matched
    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.NOT_FOUND, "Password is not Matched !");
    }
    // create token
    const { id, role, userId } = isUserExist;
    const accessToken = JwtHelper.createToken(
        { role, userId },
        config.jwt.secret,
        config.jwt.JWT_EXPIRES_IN
    )
    return { accessToken, user: { role, userId } }
}

module.exports = {
    loginUser
}
