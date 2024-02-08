const locationModel = require('../../../models/clinicLocation');

const createLocation = async (payload) => {
    const result = await locationModel.create(payload);
    return result;
}

const getAllLocation = async() =>{
    const result = await locationModel.find();
    return result;
}

const getLocation = async(id) =>{
    const result = await locationModel.findById(id);
    return result;
}

const deleteLocation = async(_id) =>{
    try{
        const result = await locationModel.findByIdAndDelete(_id);
        if(!result){
            console.log("Location not found");
            return null;
        }
        return result;
    }
    catch(error){
        console.error(error);
        return null;
    }
}

const updateLocation = async(id, payload) =>{
    const result = await locationModel.findByIdAndUpdate(id, payload, {new: true});
    return result;
}

module.exports = {
    createLocation,
    updateLocation,
    getLocation,
    getAllLocation,
    deleteLocation
}
    
