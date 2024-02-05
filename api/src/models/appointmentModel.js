const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    startTime: Date,
    finishTime: Date,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
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
