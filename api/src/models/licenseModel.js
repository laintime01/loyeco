const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const professionalLicenseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    licenseTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'LicenseType',  // Assuming you have a LicenseType model
        required: true
    },
    licenseNumber: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ProfessionalLicense', professionalLicenseSchema);
