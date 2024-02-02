const express = require('express');
const { AppointmentController } = require('./appointment.controller');

const router = express.Router();

router.get('/', AppointmentController.getAllAppointment);

router.get('/patient/appointments', AppointmentController.getPatientAppointmentById);
router.get('/patient/invoices', AppointmentController.getPatientPaymentInfo);
router.get('/doctor/invoices', AppointmentController.getDoctorInvoices);

router.get('/doctor/appointments', AppointmentController.getDoctorAppointmentsById);
router.get('/doctor/patients',AppointmentController.getDoctorPatients);

router.get('/patient-payment-info/:id', AppointmentController.getPaymentInfoViaAppintmentId);

router.post('/create', AppointmentController.createAppointment);

router.get('/:id', AppointmentController.getAppointment);

router.delete('/:id', AppointmentController.deleteAppointment);
router.patch('/:id', AppointmentController.updateAppointment);

router.patch('/doctor/update-appointment',  AppointmentController.updateAppointmentByDoctor);

module.exports = router;
