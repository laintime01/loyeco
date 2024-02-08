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
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    }
});

export default mongoose.model('clinicLocation', clinicLocationSchema);