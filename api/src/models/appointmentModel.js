const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    finishTime: Date,
    locationId: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    generalNote: String,
    status: {
        type: String,
        enum: ['Uncheckin', 'Checkin', 'Cancel', 'Missed', 'Finished'],
        default: 'Uncheckin'
    },
    patientInfoRecord: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
