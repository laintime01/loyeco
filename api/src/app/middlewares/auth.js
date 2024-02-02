const ApiError = require("../../errors/apiError");
const { JwtHelper } = require("../../helpers/jwtHelper");
const config = require("../../config");

const auth = (...rules) => async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError(404, "Token is not Found !!");
        }
        let verifiedUser;
        try {
            verifiedUser = await JwtHelper.verifyToken(token, config.jwt.secret);
        } catch (error) {
            throw new ApiError(403, "User is not Found !!");
        }
        req.user = verifiedUser;

        if (rules.length && !rules.includes(verifiedUser.role)) {
            throw new ApiError(403, "You are not Authorised !!");
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { auth };
