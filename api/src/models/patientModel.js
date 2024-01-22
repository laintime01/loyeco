const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    clinicId: {
        type: Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    preferredName: String,
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ['Unknown', 'Male', 'Female'],
        default: 'Unknown'
    },
    occupation: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    province: String,
    postalCode: String,
    country: String,
    note: String,
    emergencyContactName: String,
    emergencyContactRelationship: String,
    emergencyContactPhone: String,
    familyDrName: String,
    familyDrPhone: String,
    timeCreated: {
        type: Date,
        default: Date.now
    },
    lastModifyTime: Date,
    defaultProvider: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Patient', patientSchema);
