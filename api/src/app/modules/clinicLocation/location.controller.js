const locationService = require('./location.service');
const catchAsync = require('../../../shared/catchAsync');
const sendResponse = require('../../../shared/sendResponse');

const createLocation = catchAsync(async (req, res) => {
    await locationService.createLocation(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Location Created !!',
        success: true
    })
})

const getAllLocation = catchAsync(async(req, res) => {
    const result = await locationService.getAllLocation();
    sendResponse(res,{
        statusCode: 200,
        message: 'Successfully Get Locations !!',
        success: true,
        data: result,
    })
})

const getLocation = catchAsync(async(req, res)=> {
    const result = await locationService.getLocation(req.params.id)
    sendResponse(res, {
        statusCode:200,
        message: 'Successfully Get Location !!',
        success: true,
        data: result,
    })
})

const deleteLocation = catchAsync(async(req, res) => {
    const result = await locationService.deleteLocation(req.params.id);
    if(!result){
        sendResponse(res, {
            statusCode: 404,
            message: 'Location not found',
            success: false
        })
    }
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Location Deleted !!',
        success: true
    })
})

const updateLocation = catchAsync(async(req, res) => {
    const result = await locationService.updateLocation(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Location Updated !!',
        success: true,
        data: result,
    })
})

module.exports = {
    createLocation,
    updateLocation,
    getLocation,
    getAllLocation,
    deleteLocation
}
//     getAllClinics,