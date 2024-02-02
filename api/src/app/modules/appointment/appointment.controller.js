const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const { AppointmentService } = require("./appointment.service");

const createAppointment = catchAsync(async (req, res) => {
    const result = await AppointmentService.createAppointment(req.user, req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Appointment Created !!',
        success: true,
        data: result
    });
});

const getAllAppointment = catchAsync(async (req, res) => {
    const result = await AppointmentService.getAllAppointments();
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Retrieve All Appointment !!',
        success: true,
        data: result,
    });
});

const getAppointment = catchAsync(async (req, res) => {
    const result = await AppointmentService.getAppointment(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Get Appointment !!',
        success: true,
        data: result,
    });
});

const deleteAppointment = catchAsync(async (req, res) => {
    const result = await AppointmentService.deleteAppointment(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Deleted Appointment !!',
        success: true,
        data: result,
    });
});

const updateAppointment = catchAsync(async (req, res) => {
    const result = await AppointmentService.updateAppointment(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Updated Appointment !!',
        success: true,
        data: result,
    });
});

const getPatientAppointmentById = catchAsync(async (req, res) => {
    const result = await AppointmentService.getPatientAppointmentById(req.user);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Updated Appointment !!',
        success: true,
        data: result,
    });
});

const getDoctorAppointmentsById = catchAsync(async (req, res) => {
    const result = await AppointmentService.getDoctorAppointmentsById(req.user, req.query);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Retrieve doctor apppointments !!',
        success: true,
        data: result
    });
});

const updateAppointmentByDoctor = catchAsync(async (req, res) => {
    const result = await AppointmentService.updateAppointmentByDoctor(req.user, req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully updated apppointments !!',
        success: true,
        data: result
    });
});

const getDoctorPatients = catchAsync(async (req, res) => {
    const result = await AppointmentService.getDoctorPatients(req.user);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully retrieve doctor patients !!',
        success: true,
        data: result
    });
});

const getPaymentInfoViaAppintmentId = catchAsync(async (req, res) => {
    const result = await AppointmentService.getPaymentInfoViaAppintmentId(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully retrieve payment info !!',
        success: true,
        data: result
    });
});

const getPatientPaymentInfo = catchAsync(async (req, res) => {
    const result = await AppointmentService.getPatientPaymentInfo(req.user);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully retrieve payment info !!',
        success: true,
        data: result
    });
})

const getDoctorInvoices = catchAsync(async (req, res) => {
    const result = await AppointmentService.getDoctorInvoices(req.user);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully retrieve Doctor info !!',
        success: true,
        data: result
    });
});

module.exports = {
    getDoctorAppointmentsById,
    updateAppointmentByDoctor,
    getPatientAppointmentById,
    updateAppointment,
    createAppointment,
    getAllAppointment,
    getAppointment,
    deleteAppointment,
    getDoctorPatients,
    getPaymentInfoViaAppintmentId,
    getPatientPaymentInfo,
    getDoctorInvoices
};
