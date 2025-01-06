const express = require('express');
const { createHealthCheck, getHealthChecks } = require('../controllers/healthCheckController');
const router = express.Router();

// Create a new health check record for a user
router.post('/', createHealthCheck);

// Get health check records for a specific user by userId
router.get('/:userId', getHealthChecks);

module.exports = router;
