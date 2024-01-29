const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(process.cwd(), '.env')});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.MONGO_URI,
    default_doctor_pass: process.env.DOCTOR_PASS,
    jwt: {
        secret: process.env.JWT_SCRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRED_IN,
        refresh_secret: process.env.JWT_REFRESH_SCRET,
    }
}