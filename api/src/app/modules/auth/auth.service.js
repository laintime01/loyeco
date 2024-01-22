const bcrypt = require('bcrypt');
const prisma = require("../../../shared/prisma");
const ApiError = require('../../../errors/apiError');
const httpStatus = require('http-status');
const JwtHelper = require('../../../helpers/jwtHelper');
const config = require('../../../config');
const jwt = require('jsonwebtoken');

const loginUser = async (user) => {
    const { email, password } = user;
    const isUserExist = await prisma.auth.findUnique({
        where: { email }
    })

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !");
    }
    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.NOT_FOUND, "Password is not Matched !");
    }
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
