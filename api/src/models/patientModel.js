const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: String,
    gender: {
        type: String,
        enum: ['M', 'F']},
    email: String,
    timeCreated: {
        type: Date,
        default: Date.now
    },
    lastVisit: {
        type: Date,
        default: Date.now
    },
   
});

module.exports = mongoose.model('Patient', patientSchema);
