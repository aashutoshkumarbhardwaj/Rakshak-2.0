// src/controllers/document.controller.js
const multer = require('multer');
const path = require('path');
const Document = require('../models/document.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { sendEmail } = require('../utils/email');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/documents/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `doc-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('document');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF, JPEG, and PNG files are allowed'));
  }
}

// @desc    Upload patient document
// @route   POST /api/v1/documents
// @access  Private
exports.uploadDocument = asyncHandler(async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(new ErrorResponse(err.message, 400));
    }

    if (!req.file) {
      return next(new ErrorResponse('Please upload a file', 400));
    }

    const { patientId, documentType, notes } = req.body;

    const document = await Document.create({
      patient: patientId,
      documentType,
      filePath: req.file.path,
      fileName: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      uploadedBy: req.user.id,
      notes
    });

    res.status(201).json({
      success: true,
      data: document
    });
  });
});

// @desc    Get all documents
// @route   GET /api/v1/documents
// @access  Private
exports.getDocuments = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single document
// @route   GET /api/v1/documents/:id
// @access  Private
exports.getDocument = asyncHandler(async (req, res, next) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    return next(
      new ErrorResponse(`Document not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is authorized to view this document
  if (
    req.user.role !== 'admin' &&
    document.patient.toString() !== req.user.id
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to view this document`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: document
  });
});

// @desc    Delete document
// @route   DELETE /api/v1/documents/:id
// @access  Private
exports.deleteDocument = asyncHandler(async (req, res, next) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    return next(
      new ErrorResponse(`Document not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is authorized to delete this document
  if (
    req.user.role !== 'admin' &&
    document.uploadedBy.toString() !== req.user.id
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this document`,
        401
      )
    );
  }

  // Delete file from filesystem
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(__dirname, `../../${document.filePath}`);
  
  fs.unlink(filePath, async (err) => {
    if (err) {
      console.error(`Error deleting file: ${err}`);
      return next(new ErrorResponse('Error deleting file', 500));
    }

    await document.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  });
});
