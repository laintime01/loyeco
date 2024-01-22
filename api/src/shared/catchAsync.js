/**
 * catchAsync is a higher order function that catches errors in asynchronous route handlers and 
 * middleware and passes them to Express's error handling.
 *
 * @param {function} fn - The async function to wrap around with error handling.
 * @return {function} - The new async function with error handling.
 */
const catchAsync = (fn) => async (req, res, next) => {
    try {
        // Attempt to call the passed function
        await fn(req, res, next)
    } catch (error) {
        // If an error occurs, pass it to the next middleware in the chain
        next(error)
    }
}

module.exports = catchAsync;
