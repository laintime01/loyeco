const express = require('express');
const router = express.Router();

const locationController = require('./location.controller');

router.post('/create', locationController.createLocation);
router.get('/get', locationController.getAllLocation);
router.get('/get/:id', locationController.getLocation);
router.delete('/delete/:id', locationController.deleteLocation);
router.put('/update/:id', locationController.updateLocation);


module.exports = router;