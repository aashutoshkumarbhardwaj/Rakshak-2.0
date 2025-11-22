const express = require('express');
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  getAppointmentsByDateRange
} = require('../controllers/appointment.controller');
const { protect } = require('../middleware/auth');
const { validate, schemas, commonRules } = require('../middleware/validate');

const router = express.Router({ mergeParams: true });

// All routes are protected
router.use(protect);

router
  .route('/')
  .get(getAppointments)
  .post(
    validate(schemas.createAppointment),
    createAppointment
  );

router.get(
  '/date-range',
  validate(schemas.dateRange),
  getAppointmentsByDateRange
);

router
  .route('/:id')
  .get(
    validate([commonRules.id]),
    getAppointment
  )
  .put(
    validate([commonRules.id, ...schemas.createAppointment]),
    updateAppointment
  );

router.put(
  '/:id/cancel',
  validate([commonRules.id]),
  cancelAppointment
);

module.exports = router;
