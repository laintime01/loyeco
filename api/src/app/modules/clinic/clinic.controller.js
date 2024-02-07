const clinicService = require('./clinic.service');
const catchAsync = require('../../../shared/catchAsync');
const sendResponse = require('../../../shared/sendResponse');

const createClinic = catchAsync(async (req, res) => {
    await clinicService.createClinic(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Clinic Created !!',
        success: true
    })
})

const getAllClinics = catchAsync(async (req, res) => {
    const result = await clinicService.getAllClinics();
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Get Clinics !!',
        success: true,
        data: result,
    })
})

const getClinic = catchAsync(async (req, res) => {
    const result = await clinicService.getClinic(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Get Clinic !!',
        success: true,
        data: result,
    })
})

const deleteClinic = catchAsync(async (req, res) => {
    const result = await clinicService.deleteClinic(req.params.id);
    if (!result) {
        sendResponse(res, {
            statusCode: 404,
            message: 'Clinic not found',
            success: false
        })
    }
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Clinic Deleted !!',
        success: true
    })
})

const updateClinic = catchAsync(async (req, res) => {
    const result = await clinicService.updateClinic(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Clinic Updated !!',
        success: true,
        data: result,
    })
})

module.exports = {
    createClinic,
    updateClinic,
    getClinic,
    getAllClinics,
    deleteClinic
}
// Path: api/src/app/modules/clinic/clinic.route.js

