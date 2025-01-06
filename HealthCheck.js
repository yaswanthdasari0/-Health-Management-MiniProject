const mongoose = require('mongoose');

const HealthCheckSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Ensure userId is required
    vitalSigns: {
      bodyTemperature: { type: Number },
      respiratoryRate: { type: Number },
      heartRate: { type: Number },
      bloodPressure: {
        systolic: { type: Number },
        diastolic: { type: Number },
      },
    },
    bodyComposition: {
      waistCircumference: { type: Number },
      BMI: { type: Number },
    },
    bloodTests: {
      bloodSugar: { type: Number },
      cholesterol: {
        HDL: { type: Number },
        LDL: { type: Number },
        triglycerides: { type: Number },
        totalCholesterol: { type: Number },
      },
      completeBloodCount: {
        hemoglobin: { type: Number },
        platelets: { type: Number },
        whiteBloodCells: { type: Number },
        redBloodCells: { type: Number },
      },
      thyroidFunctionTests: {
        T4: { type: Number },
        T3: { type: Number },
        TSH: { type: Number },
      },
    },
    urinalysis: {
      blood: { type: String },
      ketones: { type: String },
      protein: { type: String },
      glucose: { type: String },
    },
    ECG: {
      rhythm: { type: String },
    },
    // Optional fields: imaging tests, cancer screening, bone density test, skin exam
    imagingTests: {
      type: [String], // Example: ["X-Ray", "MRI", "CT Scan"]
    },
    cancerScreening: {
      type: [String], // Example: ["Mammogram", "Colonoscopy"]
    },
    boneDensityTest: {
      type: String, // E.g., "Osteoporosis Screening"
    },
    skinExam: {
      type: String, // E.g., "Normal", "Abnormal", etc.
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('HealthCheck', HealthCheckSchema);
