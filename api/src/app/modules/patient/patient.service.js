const Patient = require('../../../models/patientModel');


const createPatient = async (payload) => {
    const result = await Patient.create(payload);
    return result;
}

const getAllPatients = async () => {
    const result = await Patient.find();
    return result;
}

const getPatient = async (id) => {
    const result = await Patient.findById(id);
    return result;
}

const deletePatient = async (id) => {
    const patient = await Patient.findById(id);
    await Auth.findOneAndDelete({ email: patient.email });
    const result = await Patient.findByIdAndDelete(id);
    return result;
}

const updatePatient = async (id, payload) => {
    const result = await Patient.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

module.exports = {
    createPatient,
    updatePatient,
    getPatient,
    getAllPatients,
    deletePatient
}