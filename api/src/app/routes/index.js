const express = require('express');
const DoctorRouter = require('../modules/doctor/doctor.route');
const LoginRouter = require('../modules/auth/auth.route');
const PatientRouter = require('../modules/patient/patient.route');


const router = express.Router();

const moduleRoutes = [
    {
        path: '/doctor',
        route: DoctorRouter,
    },
    {
        path: '/login',
        route: LoginRouter,
    },
    {
        path: '/patient',
        route: PatientRouter,
    },
    
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
