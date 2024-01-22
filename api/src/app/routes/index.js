const express = require('express');
const DoctorRouter = require('../modules/doctor/doctor.route');


const router = express.Router();

const moduleRoutes = [
    {
        path: '/doctor',
        route: DoctorRouter,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
