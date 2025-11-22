const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/errorResponse');

// Middleware to validate request body using express-validator
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorMessages = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));

    return next(new ErrorResponse('Validation Error', 400, errorMessages));
  };
};

// Re-export validation methods from express-validator
const { body, param, query } = require('express-validator');

// Common validation rules
const commonRules = {
  id: param('id').isMongoId().withMessage('Invalid ID format'),
  page: query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  limit: query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  email: body('email').isEmail().withMessage('Please include a valid email').normalizeEmail(),
  password: body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
  name: body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  phone: body('phone')
    .matches(/^[0-9\-\+\(\)\s]{10,15}$/)
    .withMessage('Please provide a valid phone number')
};

// Validation schemas
const schemas = {
  commonRules,
  register: [
    commonRules.name,
    commonRules.email,
    commonRules.password,
    body('role')
      .optional()
      .isIn(['patient', 'doctor', 'admin'])
      .withMessage('Invalid role')
  ],
  login: [
    commonRules.email,
    body('password').exists().withMessage('Please provide a password')
  ],
  createPatient: [
    body('dateOfBirth')
      .isISO8601()
      .withMessage('Please provide a valid date of birth')
      .custom((value) => {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        if (age < 0 || age > 120) {
          throw new Error('Please provide a valid date of birth');
        }
        return true;
      }),
    body('gender')
      .isIn(['male', 'female', 'other', 'prefer not to say'])
      .withMessage('Please provide a valid gender'),
    body('bloodGroup')
      .optional()
      .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .withMessage('Invalid blood group'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number')
  ],
  createDoctor: [
    body('specialization')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Specialization must be at least 3 characters long'),
    body('department')
      .isIn([
        'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 
        'Orthopedics', 'Ophthalmology', 'Gynecology', 'General Medicine',
        'ENT', 'Dentistry', 'Psychiatry', 'Urology', 'Oncology', 'Radiology', 'Physiotherapy'
      ])
      .withMessage('Invalid department'),
    body('consultationFee')
      .isFloat({ min: 0 })
      .withMessage('Consultation fee must be a positive number'),
    body('schedule.workingDays')
      .isArray({ min: 1 })
      .withMessage('At least one working day is required'),
    body('schedule.workingDays.*')
      .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
      .withMessage('Invalid day of week'),
    body('schedule.startTime')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage('Invalid start time format (HH:MM)'),
    body('schedule.endTime')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage('Invalid end time format (HH:MM)')
      .custom((value, { req }) => {
        if (value <= req.body.schedule.startTime) {
          throw new Error('End time must be after start time');
        }
        return true;
      })
  ],
  updateDoctor: [
  body('specialization').optional().isLength({ min: 3 }),
  body('department')
    .optional()
    .isIn(['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics',
           'Orthopedics', 'Ophthalmology', 'Gynecology',
           'General Medicine', 'ENT', 'Dentistry', 'Psychiatry',
           'Urology', 'Oncology', 'Radiology', 'Physiotherapy']),
  body('consultationFee').optional().isFloat({ min: 0 }),
  body('schedule').optional().isObject(),
  body('schedule.workingDays').optional().isArray(),
  body('schedule.startTime').optional().matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
  body('schedule.endTime').optional().matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
],

  
  createAppointment: [
    body('doctor')
      .isMongoId()
      .withMessage('Invalid doctor ID'),
    body('appointmentDate')
      .isISO8601()
      .withMessage('Invalid appointment date')
      .custom((value) => {
        const appointmentDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (appointmentDate < today) {
          throw new Error('Appointment date cannot be in the past');
        }
        
        // Max 3 months in advance
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        
        if (appointmentDate > maxDate) {
          throw new Error('Appointments can only be booked up to 3 months in advance');
        }
        
        return true;
      }),
    body('startTime')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage('Invalid time format (HH:MM)'),
    body('reason')
      .trim()
      .isLength({ min: 10, max: 500 })
      .withMessage('Reason must be between 10 and 500 characters')
  ],
  dateRange: [
    query('startDate')
      .isISO8601()
      .withMessage('Start date must be a valid date')
      .toDate(),
    query('endDate')
      .isISO8601()
      .withMessage('End date must be a valid date')
      .custom((value, { req }) => {
        if (new Date(value) < new Date(req.query.startDate)) {
          throw new Error('End date must be after start date');
        }
        return true;
      })
  ],
  uploadDocument: [
    body('patientId').isMongoId().withMessage('Valid patient ID is required'),
    body('documentType')
      .isIn(['prescription', 'report', 'scan', 'other'])
      .withMessage('Valid document type is required'),
    body('notes').optional().isString().trim().isLength({ max: 500 })
      .withMessage('Notes cannot exceed 500 characters')
  ],
  appointmentNotification: [
    body('appointmentId').isMongoId().withMessage('Valid appointment ID is required'),
    body('notificationType')
      .isIn(['reminder', 'confirmation', 'cancellation', 'reschedule'])
      .withMessage('Valid notification type is required'),
    body('sendEmail').optional().isBoolean().withMessage('sendEmail must be a boolean'),
    body('customMessage').optional().isString().trim().isLength({ max: 1000 })
      .withMessage('Custom message cannot exceed 1000 characters')
  ]
};

// File upload validation middleware
const validateFileUpload = (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  // Check file type
  const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!allowedFileTypes.includes(req.file.mimetype)) {
    return next(
      new ErrorResponse(
        'Please upload a valid file type (PDF, JPEG, or PNG)',
        400
      )
    );
  }
  
  // Check file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (req.file.size > maxSize) {
    return next(
      new ErrorResponse('File size cannot be larger than 5MB', 400)
    );
  }

  next();
};

// Export everything
module.exports = {
  validate,
  validateFileUpload,
  schemas,
  commonRules,
  body,
  param,
  query,
  validationResult
};
