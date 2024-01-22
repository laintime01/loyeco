const express = require('express');
const DoctorController = require('./doctor.controller');

const router = express.Router();

router.get('/', DoctorController.getAllDoctors);
router.post('/', DoctorController.createDoctor);
router.get('/:id', DoctorController.getDoctor);
router.delete('/:id', DoctorController.deleteDoctor);
router.patch('/:id', DoctorController.updateDoctor);

module.exports = router;
