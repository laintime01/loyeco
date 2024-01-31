const bcrypt = require('bcrypt');
const ApiError = require("../../../errors/apiError");
const httpStatus = require("http-status");
const calculatePagination = require("../../../shared/paginationHelper");
const User = require("../../../models/userModel");

const create = async (payload) => {
    try {
        const { password, ...othersData } = payload;
        
        // Check if email already exists
        const existingUser = await User.findOne({ email: othersData.email });
        if (existingUser) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
        }

        // Check if password is provided
        if (!password) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Password is required');
        }

        const hashedPassword = bcrypt.hashSync(password, 12);
        const newUser = new User({ ...othersData, password: hashedPassword });
        await newUser.save();

        // Return a success message instead of the user record
        return {
            message: 'Registration successful',
        };
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message)
    }
}


const getAllUsers = async (filters, options) => {
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

    const result = await User.find(query).skip(skip).limit(limit);
    const total = await User.countDocuments(query);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result
    }
}

const getUser = async (id) => {
    const result = await User.findById(id);
    return result;
}

const deleteUser = async (id) => {
    const user = await User.findByIdAndRemove(id);
    return user;
}

const updateUser = async (id, payload) => {
    const result = await User.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
}

module.exports = {
    create,
    updateUser,
    deleteUser,
    getAllUsers,
    getUser
}
