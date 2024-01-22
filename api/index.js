const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/config/db.config');
const ApiError = require('./src/errors/apiError');
const httpStatus = require('http-status');
const config = require('./src/config');
const router = require('./src/app/routes');

const app = express();

//set up the database
connectDB();

//set up the cors options
var corsOptions = {
    origin: 'http://localhost:3000'
};

//set up the server
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

//set up the routes
app.use('/api', router);


//set up the error handler
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ success: false, message: err.message })
    } else {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Something Went Wrong',
        });
    }
    next();
})

//set up the port
const PORT = config.port || 8080;

//start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});





