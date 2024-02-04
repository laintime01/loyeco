const Patient = require('../../../models/patientModel');


const createPatient = async (payload) => {
    console.log("payload", payload);
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

const deletePatient = async (_id) => {
    try {
      const result = await Patient.findByIdAndDelete(_id);
      if (!result) {
        console.log("Patient not found");
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
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