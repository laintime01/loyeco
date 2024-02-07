const express = require('express');
const ClinicController = require('./clinic.controller');

const router = express.Router();


router.get('/', ClinicController.getAllClinics);
router.post('/', ClinicController.createClinic);
router.get('/:id', ClinicController.getClinic);
router.delete('/:id', ClinicController.deleteClinic);
router.patch('/:id', ClinicController.updateClinic);

module.exports = router;