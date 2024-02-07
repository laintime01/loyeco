const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clinicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['Solo'],
        default: 'Solo'
    },
    timeCreated: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Clinic', clinicSchema);