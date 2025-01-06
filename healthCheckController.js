const HealthCheck = require('../models/HealthCheck');

// Create a new health check record
exports.createHealthCheck = async (req, res) => {
    const {
        userId, vitalSigns, bloodTests, bodyComposition, urinalysis,
        ECG, imagingTests, cancerScreening, boneDensityTest, skinExam
    } = req.body;

    try {
        const newHealthCheck = new HealthCheck({
            userId,
            vitalSigns,
            bloodTests,
            bodyComposition,
            urinalysis,
            ECG,
            imagingTests,
            cancerScreening,
            boneDensityTest,
            skinExam
        });

        // Save health check
        const savedHealthCheck = await newHealthCheck.save();
        res.status(201).json(savedHealthCheck);
    } catch (error) {
        console.error('Error creating health check:', error.message);
        res.status(400).json({ error: 'Error creating health check record', details: error.message });
    }
};

// Retrieve health check records for a specific user
exports.getHealthChecks = async (req, res) => {
    const { userId } = req.params;

    try {
        const healthChecks = await HealthCheck.find({ userId }).sort({ createdAt: -1 }); // Sort by most recent first
        if (healthChecks.length <= 0) {
            return res.status(404).json({ message: 'No health check records found for this user' });
        }
        res.status(200).json(healthChecks);
    } catch (error) {
        console.error('Error retrieving health checks:', error.message);
        res.status(500).json({ error: 'Error retrieving health checks', details: error.message });
    }
};