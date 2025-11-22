const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: [true, 'Please add a patient']
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor',
    required: [true, 'Please add a doctor']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Please add an appointment date']
  },
  startTime: {
    type: String,
    required: [true, 'Please add a start time']
  },
  endTime: {
    type: String,
    required: [true, 'Please add an end time']
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  reason: {
    type: String,
    required: [true, 'Please add a reason for the appointment'],
    maxlength: [500, 'Reason cannot be more than 500 characters']
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  },
  diagnosis: {
    type: String,
    maxlength: [1000, 'Diagnosis cannot be more than 1000 characters']
  },
  prescription: [{
    medicine: String,
    dosage: String,
    duration: String,
    instructions: String
  }],
  followUpDate: Date,
  isPaid: {
    type: Boolean,
    default: false
  },
  paymentAmount: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'insurance', 'bank-transfer', null],
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Prevent duplicate bookings for same doctor at same time
AppointmentSchema.index(
  { doctor: 1, appointmentDate: 1, startTime: 1 },
  { unique: true }
);

// Populate patient and doctor details when querying appointments
AppointmentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'patient',
    select: 'user',
    populate: {
      path: 'user',
      select: 'name email'
    }
  }).populate({
    path: 'doctor',
    select: 'user specialization',
    populate: {
      path: 'user',
      select: 'name'
    }
  });
  
  next();
});

// Calculate end time if not provided (default 30 min slot)
AppointmentSchema.pre('save', function(next) {
  if (!this.endTime && this.startTime) {
    const [hours, minutes] = this.startTime.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(hours, minutes + 30, 0, 0);
    this.endTime = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
