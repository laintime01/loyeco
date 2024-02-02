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
    email: String,
    timeCreated: {
        type: Date,
        default: Date.now
    },
    phone: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Patient', patientSchema);
