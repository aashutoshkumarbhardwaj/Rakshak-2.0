const express = require('express');
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientAppointments
} = require('../controllers/patient.controller');
const { protect, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate'); // ← removed commonRules

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(authorize('admin'), getPatients)
  .post(
    validate(schemas.createPatient),
    createPatient
  );

router
  .route('/:id')
  .get(
    validate([schemas.commonRules.id]),
    getPatient
  )
  .put(
    validate([schemas.commonRules.id, ...schemas.createPatient]),
    updatePatient
  )
  .delete(
    validate([schemas.commonRules.id]),
    authorize('admin'),
    deletePatient
  );

router.get(
  '/:id/appointments',
  validate([schemas.commonRules.id]),
  getPatientAppointments
);

module.exports = router;
