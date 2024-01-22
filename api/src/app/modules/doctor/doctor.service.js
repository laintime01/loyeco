const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ApiError = require("../../../errors/apiError");
const httpStatus = require("http-status");
const calculatePagination = require("../../../shared/paginationHelper");
const Doctor = require('../../../models/doctorModel');


const UserRole = {
    doctor: 'doctor',
    // add other user roles if any
};

const create = async (payload) => {
    try {
        const { password, ...othersData } = payload;
        
        // Check if email already exists
        const existingDoctor = await Doctor.findOne({ email: othersData.email });
        if (existingDoctor) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
        }

        const hashedPassword = bcrypt.hashSync(password, 12);
        const doctor = new Doctor({ ...othersData, password: hashedPassword });
        await doctor.save();

        // Return a success message instead of the doctor record
        return {
            message: 'Registration successful',
        };
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message)
    }
}

const getAllDoctors = async (filters, options) => {
    const { limit, page, skip } = calculatePagination(options);
    const { searchTerm, max, min, specialist, ...filterData } = filters;

    const query = {};

    if (searchTerm) {
        query['$or'] = DoctorSearchableFields.map((field) => ({
            [field]: new RegExp(searchTerm, 'i')
        }));
    }

    if (Object.keys(filterData).length > 0) {
        Object.entries(filterData).forEach(([key, value]) => {
            query[key] = value;
        });
    }

    if (min || max) {
        query.price = {};

        if (min) {
            query.price.$gte = min;
        }

        if (max) {
            query.price.$lte = max;
        }
    }

    if (specialist) {
        query.services = new RegExp(specialist, 'i');
    }

    const result = await Doctor.find(query).skip(skip).limit(limit);
    const total = await Doctor.countDocuments(query);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result
    }
}

const getDoctor = async (id) => {
    const result = await Doctor.findById(id);
    return result;
}

const deleteDoctor = async (id) => {
    const doctor = await Doctor.findByIdAndRemove(id);
    return doctor;
}

const updateDoctor = async (id, payload) => {
    const result = await Doctor.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
}

module.exports = {
    create,
    updateDoctor,
    deleteDoctor,
    getAllDoctors,
    getDoctor
}
