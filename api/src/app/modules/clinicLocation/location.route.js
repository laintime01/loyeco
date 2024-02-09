const express = require('express');
const router = express.Router();

const locationController = require('./location.controller');

router.post('/', locationController.createLocation);
router.get('/', locationController.getAllLocation);
router.get('/:id', locationController.getLocation);
router.delete('/delete/:id', locationController.deleteLocation);
router.put('/update/:id', locationController.updateLocation);


module.exports = router;