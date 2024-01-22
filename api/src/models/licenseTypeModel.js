const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const licenseTypeSchema = new Schema({
    licenseName: {
        type: String,
        required: true
    },
    licensePrefix: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('LicenseType', licenseTypeSchema);
