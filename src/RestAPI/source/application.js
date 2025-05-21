require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mainRouter = require('./RestAPI/index.js');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Main router
app.use('/api', mainRouter);

// 404 error handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message || 'Something went wrong'
    });
});

// Server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;