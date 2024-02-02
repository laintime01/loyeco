const ApiError = require("../../../errors/apiError");
const httpStatus = require("http-status");
const moment = require('moment');
const patientModel = require("../../../models/patientModel");
const appointmentModel = require("../../../models/appointmentModel");
const Doctor = require("../../../models/userModel");

const createAppointment = async (user, payload) => {
    const { patientInfo, payment } = payload;
    // createa a new appointment
    
}
        
const getAllAppointments = async () => {
    const result = await appointmentModel.findall();
    return result;
}

const getAppointment = async (id) => {
    const result = await appointmentModel.findById(id).populate('doctorId');
    return result;
}

const getPatientAppointmentById = async (patient_id,doctor_Id) => {
    // check if the patient is exist
    const isPatient = await patientModel.findById(patient_id);

    if (!isPatient) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    const result = await appointmentModel.find({ patientId: patient_id }).populate('doctorId');
    return result;
}

const getPaymentInfoViaAppintmentId = async (id) => {
    const result = await appointmentModel.findById(id).populate('payment');
    return result;
}

const getPatientPaymentInfo = async (patientId) => {
    const isUserExist = await patientModel.findById(patientId)
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    const result = await appointmentModel.find({ patientId: patientId }).populate('payment');
    return result;
}
const getDoctorInvoices = async(user) =>{
    const { userId } = user;
    const isUserExist = await Doctor.findById(userId);
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await Payment.find({ 'appointment.doctorId': isUserExist.id }).populate({
        path: 'appointment',
        populate: {
            path: 'patient',
            select: 'firstName lastName'
        }
    });
    
    return result;
}

const deleteAppointment = async (id) => {
    const result = await appointmentModel.findByIdAndDelete(id);
    return result;
}

const updateAppointment = async (id, payload) => {    
    const result = await appointmentModel.findByIdAndUpdate(id, payload, { new: true })
    return result;
}

//doctor Side
const getDoctorAppointmentsById = async (user, filter) => {
    const { userId } = user;
    const isDoctor = await Doctor.findById(userId);
    if (!isDoctor) {throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')}

    let andCondition = { doctorId: userId };
    
    if (filter.sortBy == 'today') {
        const today = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const tomorrow = moment(today).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');

        andCondition.scheduleDate = {
            gte: today,
            lt: tomorrow
        }
    }
    if (filter.sortBy == 'upcoming') {
        const upcomingDate = moment().startOf('day').add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
        andCondition.scheduleDate = {
            gte: upcomingDate
        }
    }
    const whereConditions = andCondition ? andCondition : {}

    const result = await appointmentModel.find(whereConditions).populate('patientId');
    return result;
}

const getDoctorPatients = async (user) => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }

    const patients = await prisma.appointments.findMany({
        where: {
            doctorId: userId
        },
        distinct: ['patientId']
    });

    //extract patients from the appointments table
    const patientIds = patients.map(appointment => appointment.patientId);

    const patientList = await prisma.patient.findMany({
        where: {
            id: {
                in: patientIds
            }
        }
    })
    return patientList;
}

const updateAppointmentByDoctor = async (user, payload) => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.appointments.update({
        where: {
            id: payload.id
        },
        data: payload
    })
    return result;
}

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointment,
    deleteAppointment,
    updateAppointment,
    getPatientAppointmentById,
    getDoctorAppointmentsById,
    updateAppointmentByDoctor,
    getDoctorPatients,
    getPaymentInfoViaAppintmentId,
    getPatientPaymentInfo,
    getDoctorInvoices
};
