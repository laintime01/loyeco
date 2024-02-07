const Clinic = require('../../../models/clinicModel');

const createClinic = async (payload) => {
    const resut = await Clinic.create(payload);
    return resut;
}

const getAllClinics = async () => {
    const result = await Clinic.find();
    return result;
}

const getClinic = async (id) => {
    const result = await Clinic.findById(id);
    return result;
}

const deleteClinic = async (_id) => {
    try{
        const result = await Clinic.findByIdAndDelete(_id);
        if(!result){
            console.log("Clinic not found");
            return null;
        }
        return result;
    }

    catch(error){
        console.error(error);
        return null;
    }
}

const updateClinic = async(id, payload)=>{
    const result = await Clinic.findByIdAndUpdate(id, payload, {new: true});
    return result;
}

module.exports = {
    createClinic,
    updateClinic,
    getClinic,
    getAllClinics,
    deleteClinic
}

// Path: api/src/app/modules/clinic/clinic.controller.js