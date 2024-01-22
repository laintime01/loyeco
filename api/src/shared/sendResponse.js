const sendResponse = (res, data) => {
    const response = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null,
        data: data.data || null,
    }
    res.status(data.statusCode).json(response);
}

module.exports = sendResponse;
