const express = require('express');
const PatientController = require('./patient.controller');
const auth = require('../../middlewares/auth');
const AuthUser = require('../../../enums');

const router = express.Router();

router.get('/', PatientController.getAllPatients);
router.post('/', PatientController.createPatient);
router.get('/:id', PatientController.getPatient);
router.delete('/:id', PatientController.deletePatient);
router.patch('/:id', auth(AuthUser.PATIENT), PatientController.updatePatient);

module.exports = {
    PatientRouter: router
};
