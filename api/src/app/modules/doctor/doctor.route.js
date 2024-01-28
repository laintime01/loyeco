const express = require('express');
const DoctorController = require('./doctor.controller');

const router = express.Router();

router.get('/', DoctorController.getAllUsers);
router.post('/', DoctorController.createUser);
router.get('/:id', DoctorController.getUser);
router.delete('/:id', DoctorController.deleteUser);
router.patch('/:id', DoctorController.updateUser);

module.exports = router;
