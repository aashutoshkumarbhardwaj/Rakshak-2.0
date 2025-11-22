const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error');

// Initialize express
const app = express();

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/patients', require('./routes/patient.routes'));
app.use('/api/v1/doctors', require('./routes/doctor.routes'));
app.use('/api/v1/appointments', require('./routes/appointment.routes'));

// Error Handler - Should be last piece of middleware
app.use(errorHandler);

module.exports = app;
