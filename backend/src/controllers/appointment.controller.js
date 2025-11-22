const Appointment = require('../models/appointment.model');
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = asyncHandler(async (req, res, next) => {
  // If user is not an admin, they can only see their own appointments
  if (req.user.role === 'patient') {
    const patient = await Patient.findOne({ user: req.user.id });
    req.query.patient = patient._id;
  } else if (req.user.role === 'doctor') {
    const doctor = await Doctor.findOne({ user: req.user.id });
    req.query.doctor = doctor._id;
  }

  res.status(200).json(res.advancedResults);
});

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(
      new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is authorized to view this appointment
  const patient = await Patient.findOne({ user: req.user.id });
  const doctor = await Doctor.findOne({ user: req.user.id });
  
  if (
    req.user.role !== 'admin' &&
    appointment.patient.toString() !== patient?._id.toString() &&
    appointment.doctor.toString() !== doctor?._id.toString()
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to view this appointment`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = asyncHandler(async (req, res, next) => {
  // Add patient to req.body
  const patient = await Patient.findOne({ user: req.user.id });
  
  if (!patient) {
    return next(
      new ErrorResponse(`No patient found for user ${req.user.id}`, 404)
    );
  }
  
  req.body.patient = patient._id;

  // Check if doctor exists
  const doctor = await Doctor.findById(req.body.doctor);
  if (!doctor) {
    return next(
      new ErrorResponse(`No doctor found with id ${req.body.doctor}`, 404)
    );
  }

  // Check if the selected time slot is available
  const existingAppointment = await Appointment.findOne({
    doctor: req.body.doctor,
    appointmentDate: req.body.appointmentDate,
    startTime: req.body.startTime,
    status: { $ne: 'cancelled' }
  });

  if (existingAppointment) {
    return next(
      new ErrorResponse('The selected time slot is not available', 400)
    );
  }

  // Check if doctor is available at the requested time
  if (!isDoctorAvailable(doctor, req.body.appointmentDate, req.body.startTime)) {
    return next(
      new ErrorResponse('Doctor is not available at the requested time', 400)
    );
  }

  const appointment = await Appointment.create(req.body);

  res.status(201).json({
    success: true,
    data: appointment
  });
});

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = asyncHandler(async (req, res, next) => {
  let appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(
      new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is authorized to update this appointment
  const patient = await Patient.findOne({ user: req.user.id });
  const doctor = await Doctor.findOne({ user: req.user.id });
  
  if (
    req.user.role !== 'admin' &&
    appointment.patient.toString() !== patient?._id.toString() &&
    appointment.doctor.toString() !== doctor?._id.toString()
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this appointment`,
        401
      )
    );
  }

  // If updating time, check if new time is available
  if (req.body.appointmentDate || req.body.startTime) {
    const appointmentDate = req.body.appointmentDate || appointment.appointmentDate;
    const startTime = req.body.startTime || appointment.startTime;
    
    const existingAppointment = await Appointment.findOne({
      _id: { $ne: req.params.id },
      doctor: appointment.doctor,
      appointmentDate,
      startTime,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return next(
        new ErrorResponse('The selected time slot is not available', 400)
      );
    }
  }

  appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
exports.cancelAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(
      new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is authorized to cancel this appointment
  const patient = await Patient.findOne({ user: req.user.id });
  const doctor = await Doctor.findOne({ user: req.user.id });
  
  if (
    req.user.role !== 'admin' &&
    appointment.patient.toString() !== patient?._id.toString() &&
    appointment.doctor.toString() !== doctor?._id.toString()
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to cancel this appointment`,
        401
      )
    );
  }

  appointment.status = 'cancelled';
  await appointment.save();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get appointments by date range
// @route   GET /api/appointments/date-range
// @access  Private
exports.getAppointmentsByDateRange = asyncHandler(async (req, res, next) => {
  const { startDate, endDate, doctorId } = req.query;
  
  if (!startDate || !endDate) {
    return next(
      new ErrorResponse('Please provide both start and end dates', 400)
    );
  }

  const query = {
    appointmentDate: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    },
    status: { $ne: 'cancelled' }
  };

  // Filter by doctor if provided
  if (doctorId) {
    query.doctor = doctorId;
  } else if (req.user.role === 'doctor') {
    // If user is a doctor, only show their appointments
    const doctor = await Doctor.findOne({ user: req.user.id });
    query.doctor = doctor._id;
  } else if (req.user.role === 'patient') {
    // If user is a patient, only show their appointments
    const patient = await Patient.findOne({ user: req.user.id });
    query.patient = patient._id;
  }

  const appointments = await Appointment.find(query)
    .sort('appointmentDate startTime')
    .populate('patient', 'user')
    .populate('doctor', 'user specialization');

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// Helper function to check doctor's availability
const isDoctorAvailable = (doctor, appointmentDate, startTime) => {
  // Convert appointment date to day of week (0-6, where 0 is Sunday)
  const appointmentDay = new Date(appointmentDate).getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[appointmentDay];
  
  // Check if doctor works on this day
  if (!doctor.schedule.workingDays.includes(dayName)) {
    return false;
  }
  
  // Check if time is within working hours
  if (startTime < doctor.schedule.startTime || startTime >= doctor.schedule.endTime) {
    return false;
  }
  
  // Check if time is during break
  if (doctor.schedule.breakStart && doctor.schedule.breakEnd) {
    if (startTime >= doctor.schedule.breakStart && startTime < doctor.schedule.breakEnd) {
      return false;
    }
  }
  
  return true;
};
