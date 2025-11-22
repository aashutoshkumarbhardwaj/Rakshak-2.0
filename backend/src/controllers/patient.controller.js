const Patient = require('../models/patient.model');
const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private/Admin
exports.getPatients = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Private
exports.getPatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id)
    .populate({
      path: 'user',
      select: 'name email'
    });

  if (!patient) {
    return next(
      new ErrorResponse(`Patient not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is patient owner or admin
  if (patient.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to view this patient`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: patient
  });
});

// @desc    Create patient
// @route   POST /api/patients
// @access  Private
exports.createPatient = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Check for existing patient profile
  const existingPatient = await Patient.findOne({ user: req.user.id });
  
  if (existingPatient && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} has already created a patient profile`,
        400
      )
    );
  }

  const patient = await Patient.create(req.body);

  res.status(201).json({
    success: true,
    data: patient
  });
});

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
exports.updatePatient = asyncHandler(async (req, res, next) => {
  let patient = await Patient.findById(req.params.id);

  if (!patient) {
    return next(
      new ErrorResponse(`Patient not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is patient owner or admin
  if (patient.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this patient`,
        401
      )
    );
  }

  // Prevent changing user reference
  if (req.body.user) {
    delete req.body.user;
  }

  patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: patient
  });
});

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private/Admin
exports.deletePatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return next(
      new ErrorResponse(`Patient not found with id of ${req.params.id}`, 404)
    );
  }

  await patient.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get patient appointments
// @route   GET /api/patients/:id/appointments
// @access  Private
exports.getPatientAppointments = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    const appointments = await Appointment.find({ patient: req.params.id });
    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
