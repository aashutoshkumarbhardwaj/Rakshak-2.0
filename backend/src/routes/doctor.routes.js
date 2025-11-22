const express = require('express');
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorAvailability
} = require('../controllers/doctor.controller');
const { protect, authorize } = require('../middleware/auth');
const { validate, schemas, commonRules } = require('../middleware/validate');

const router = express.Router({ mergeParams: true });

// Public routes
router
  .route('/')
  .get(getDoctors);

router
  .route('/:id')
  .get(
    validate([commonRules.id]),
    getDoctor
  );

router.get(
  '/:id/availability',
  validate([commonRules.id]),
  getDoctorAvailability
);

// Protected routes
router.use(protect);

router
  .route('/')
  .post(
    authorize('admin'),
    validate(schemas.createDoctor),
    createDoctor
  );

router
  .route('/:id')
  .put(
    authorize('admin'),
    validate([commonRules.id, ...schemas.updateDoctor]),
    updateDoctor
  )
  .delete(
    validate([commonRules.id]),
    authorize('admin'),
    deleteDoctor
  );

module.exports = router;
