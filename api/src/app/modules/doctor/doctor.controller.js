const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const UserService = require("./doctor.service");
const pick = require("../../../shared/pick");
const { IDoctorFiltersData, IDoctorOptions } = require("./doctor.interface");

const createUser = catchAsync(async (req, res) => {
    await UserService.create(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully User Created !!',
        success: true
    })
})

const getAllUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, IDoctorFiltersData);
    const options = pick(req.query, IDoctorOptions);
    const result = await UserService.getAllUsers(filter, options);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Retrieve users !!',
        success: true,
        data: result,
    })
})

const getUser = catchAsync(async (req, res) => {
    const result = await UserService.getUser(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Get User !!',
        success: true,
        data: result,
    })
})

const deleteUser = catchAsync(async (req, res) => {
    const result = await UserService.deleteUser(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Deleted User !!',
        success: true,
        data: result,
    })
})

const updateUser = catchAsync(async (req, res) => {
    const result = await UserService.updateUser(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Updated User !!',
        success: true,
        data: result,
    })
})

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUser
}
