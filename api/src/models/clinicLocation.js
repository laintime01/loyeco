const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clinicLocationSchema = new Schema({
    clinicId: {
        type: Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    province: {
        type: String,
    },
    postCode: {
        type: String,
    }
});

module.exports = mongoose.model('ClinicLocation', clinicLocationSchema);