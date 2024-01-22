const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const DoctorService = require("./doctor.service");
const pick = require("../../../shared/pick");
const { IDoctorFiltersData, IDoctorOptions } = require("./doctor.interface");

const createDoctor = catchAsync(async (req, res) => {
    await DoctorService.create(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Doctor Created !!',
        success: true
    })
})

const getAllDoctors = catchAsync(async (req, res) => {
    const filter = pick(req.query, IDoctorFiltersData);
    const options = pick(req.query, IDoctorOptions);
    const result = await DoctorService.getAllDoctors(filter, options);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Retrieve doctors !!',
        success: true,
        data: result,
    })
})

const getDoctor = catchAsync(async (req, res) => {
    const result = await DoctorService.getDoctor(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Get Doctor !!',
        success: true,
        data: result,
    })
})

const deleteDoctor = catchAsync(async (req, res) => {
    const result = await DoctorService.deleteDoctor(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Deleted Doctor !!',
        success: true,
        data: result,
    })
})

const updateDoctor = catchAsync(async (req, res) => {
    const result = await DoctorService.updateDoctor(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Updated Doctor !!',
        success: true,
        data: result,
    })
})

module.exports = {
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getAllDoctors,
    getDoctor
}
