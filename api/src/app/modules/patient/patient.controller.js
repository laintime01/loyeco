const { Request, Response } = require("express");
const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const PatientService = require("./patient.service");
const { Patient } = require("@prisma/client");

const createPatient = catchAsync(async (req, res) => {
    await PatientService.createPatient(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Patient Created !!',
        success: true
    })
})

const getAllPatients = catchAsync(async (req, res) => {
    const result = await PatientService.getAllPatients();
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Get Patients !!',
        success: true,
        data: result,
    })
})

const getPatient = catchAsync(async (req, res) => {
    const result = await PatientService.getPatient(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Get Patient !!',
        success: true,
        data: result,
    })
})

const deletePatient = catchAsync(async (req, res) => {
    const result = await PatientService.deletePatient(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Deleted Patient !!',
        success: true,
        data: result,
    })
})

const updatePatient = catchAsync(async (req, res) => {
    const result = await PatientService.updatePatient(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Updated Patient !!',
        success: true,
        data: result,
    })
})

module.exports = {
    PatientController: {
        createPatient,
        updatePatient,
        getPatient,
        getAllPatients,
        deletePatient,
    }
}
