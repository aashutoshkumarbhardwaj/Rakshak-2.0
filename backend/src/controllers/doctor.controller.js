const Doctor = require('../models/doctor.model');
const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];
  
  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  
  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  let query = Doctor.find(JSON.parse(queryStr)).populate({
    path: 'user',
    select: 'name email'
  });

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Doctor.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const doctors = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: doctors.length,
    pagination,
    data: doctors
  });
});

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctor = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id).populate({
    path: 'user',
    select: 'name email'
  });

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: doctor
  });
});

// @desc    Create doctor
// @route   POST /api/doctors
// @access  Private/Admin
exports.createDoctor = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Check for existing doctor profile
  const existingDoctor = await Doctor.findOne({ user: req.user.id });
  
  if (existingDoctor) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} has already created a doctor profile`,
        400
      )
    );
  }

  const doctor = await Doctor.create(req.body);

  // Update user role to doctor
  await User.findByIdAndUpdate(req.user.id, { role: 'doctor' });

  res.status(201).json({
    success: true,
    data: doctor
  });
});

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private
exports.updateDoctor = asyncHandler(async (req, res, next) => {
  let doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is doctor owner or admin
  if (doctor.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this doctor`,
        401
      )
    );
  }

  // Prevent changing user reference
  if (req.body.user) {
    delete req.body.user;
  }

  doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: doctor
  });
});

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
exports.deleteDoctor = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  // Change user role back to patient
  await User.findByIdAndUpdate(doctor.user, { role: 'patient' });
  
  await doctor.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get doctor's available time slots
// @route   GET /api/doctors/:id/availability
// @access  Public
exports.getDoctorAvailability = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);
  
  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  // This is a simplified example - in a real app, you'd check against existing appointments
  const availability = {
    workingDays: doctor.schedule.workingDays,
    workingHours: {
      start: doctor.schedule.startTime,
      end: doctor.schedule.endTime
    },
    breakTime: {
      start: doctor.schedule.breakStart,
      end: doctor.schedule.breakEnd
    }
  };

  res.status(200).json({
    success: true,
    data: availability
  });
});
