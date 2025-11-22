const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  specialization: {
    type: String,
    required: [true, 'Please add a specialization'],
    trim: true
  },
  qualifications: [{
    degree: String,
    institution: String,
    year: Number
  }],
  experience: {
    type: Number,
    min: 0
  },
  department: {
    type: String,
    required: [true, 'Please add a department'],
    enum: [
      'Cardiology',
      'Dermatology',
      'Neurology',
      'Pediatrics',
      'Orthopedics',
      'Ophthalmology',
      'Gynecology',
      'General Medicine',
      'ENT',
      'Dentistry',
      'Psychiatry',
      'Urology',
      'Oncology',
      'Radiology',
      'Physiotherapy'
    ]
  },
  consultationFee: {
    type: Number,
    required: [true, 'Please add consultation fee']
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  schedule: {
    workingDays: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    startTime: String, // Format: '09:00'
    endTime: String,   // Format: '17:00'
    breakStart: String,
    breakEnd: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  ratingsAverage: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate
DoctorSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'doctor',
  justOne: false
});

// Cascade delete appointments when a doctor is deleted
DoctorSchema.pre('remove', async function(next) {
  await this.model('Appointment').deleteMany({ doctor: this._id });
  next();
});

module.exports = mongoose.model('Doctor', DoctorSchema);
