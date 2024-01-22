/**
 * @typedef {Object} IDoctorFilters
 * @property {string} [searchTerm]
 * @property {string} [firstName]
 * @property {string} [gender]
 * @property {string} [city]
 * @property {string} [max]
 * @property {string} [min]
 * @property {string} [specialist]
 */

/**
 * @type {string[]}
 */
const IDoctorFiltersData = ['searchTerm','firstName','lastName','gender','city', 'max', 'min', 'specialist'];

/**
 * @type {string[]}
 */
const IDoctorOptions = ['limit', 'page', 'sortBy', 'sortOrder'];

/**
 * @type {string[]}
 */
const DoctorSearchableFields = ['firstName', 'lastName', 'address', 'specialization', 'degree'];

module.exports = {
    IDoctorFiltersData,
    IDoctorOptions,
    DoctorSearchableFields
};
