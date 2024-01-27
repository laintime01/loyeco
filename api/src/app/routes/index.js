const express = require('express');
const DoctorRouter = require('../modules/doctor/doctor.route');
const LoginRouter = require('../modules/auth/auth.route');


const router = express.Router();

const moduleRoutes = [
    {
        path: '/doctor',
        route: DoctorRouter,
    },
    {
        path: '/login',
        route: LoginRouter,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
