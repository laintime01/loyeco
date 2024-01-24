const bcrypt = require('bcrypt');
const User = require('../../../models/userModel');
const ApiError = require('../../../errors/apiError');
const httpStatus = require('http-status');
const JwtHelper = require('../../../helpers/jwtHelper');
const config = require('../../../config');
const jwt = require('jsonwebtoken');

const loginUser = async (user) => {
    const { email, password } = user;
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist!");
    }

    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.NOT_FOUND, "Password does not match!");
    }

    const { role, userId } = isUserExist;
    const accessToken = JwtHelper.createToken(
        { role, userId },
        config.jwt.secret,
        config.jwt.JWT_EXPIRES_IN
    );

    return { accessToken, user: { role, userId } };
};

const registerUser = async (user) => {
    const { firstname, lastname, username, password, email } = user;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        firstname,
        lastname,
        username,
        password: hashedPassword,
        email
    });

    await newUser.save();

    return newUser;
};

module.exports = {
    loginUser,
    registerUser
};
