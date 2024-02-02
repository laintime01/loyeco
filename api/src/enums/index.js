const BloodGroup = {
    'O+': 'O+', 'O-': 'O-', 'B+': 'B+', 'B-': 'B-', 'AB+': 'AB+', 'AB-': 'AB-', 'A+': 'A+', 'A-': 'A-'
}

const USER_RULES = {
    "ADMIN": "ADMIN",
    "PATIENT": "PATIENT",
    "DOCTOR": "DOCTOR"
}

const AuthUser = {
    ADMIN: 'admin',
    DOCTOR: 'doctor',
    PATIENT: 'patient',
    SUPER_ADMIN: 'super_admin'
}

module.exports = { BloodGroup, USER_RULES, AuthUser };
