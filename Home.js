import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [healthData, setHealthData] = useState({
    userId: '',
    vitalSigns: {
      bodyTemperature: '',
      respiratoryRate: '',
      heartRate: '',
      bloodPressure: { systolic: '', diastolic: '' },
    },
    bodyComposition: { height: '', weight: '', waistCircumference: '', BMI: '' },
    bloodTests: {
      bloodSugar: '',
      cholesterol: { HDL: '', LDL: '', triglycerides: '', totalCholesterol: '' },
      completeBloodCount: { hemoglobin: '', platelets: '', whiteBloodCells: '', redBloodCells: '' },
      thyroidFunctionTests: { T4: '', T3: '', TSH: '' },
    },
    urinalysis: { blood: '', ketones: '', protein: '', glucose: '' },
    ECG: { rhythm: '' },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [category, subCategory, subField] = name.split('.');

    setHealthData((prevState) => {
      const updatedData = { ...prevState };

      if (subField) {
        updatedData[category][subCategory][subField] = value;
      } else if (subCategory) {
        updatedData[category][subCategory] = value;
      } else {
        updatedData[category] = value;
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2000/api/healthchecks', healthData);
      alert('Health checkup data submitted');
      navigate(`/submitted-data/${healthData.userId}`);
    } catch (error) {
      alert('Submission failed');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Health Checkup</h2>

        {/* User ID */}
        <label>User ID</label>
        <input
          type="text"
          name="userId"
          value={healthData.userId}
          onChange={handleChange}
          required
        />

        {/* Vital Signs */}
        <h3>Vital Signs</h3>
        <label>Body Temperature</label>
        <input
          type="number"
          name="vitalSigns.bodyTemperature"
          value={healthData.vitalSigns.bodyTemperature}
          onChange={handleChange}
          placeholder="e.g. 36.6°C"
        />
        <label>Respiratory Rate</label>
        <input
          type="number"
          name="vitalSigns.respiratoryRate"
          value={healthData.vitalSigns.respiratoryRate}
          onChange={handleChange}
          placeholder="e.g. 18 breaths per minute"
        />
        <label>Heart Rate</label>
        <input
          type="number"
          name="vitalSigns.heartRate"
          value={healthData.vitalSigns.heartRate}
          onChange={handleChange}
          placeholder="e.g. 72 bpm"
        />
        <label>Systolic Blood Pressure</label>
        <input
          type="number"
          name="vitalSigns.bloodPressure.systolic"
          value={healthData.vitalSigns.bloodPressure.systolic}
          onChange={handleChange}
          placeholder="e.g. 120 mmHg"
        />
        <label>Diastolic Blood Pressure</label>
        <input
          type="number"
          name="vitalSigns.bloodPressure.diastolic"
          value={healthData.vitalSigns.bloodPressure.diastolic}
          onChange={handleChange}
          placeholder="e.g. 80 mmHg"
        />

        {/* Body Composition */}
        <h3>Body Composition</h3>
        <label>Height</label>
        <input
          type="number"
          name="bodyComposition.height"
          value={healthData.bodyComposition.height}
          onChange={handleChange}
          placeholder="e.g. 170 cm"
        />
        <label>Weight</label>
        <input
          type="number"
          name="bodyComposition.weight"
          value={healthData.bodyComposition.weight}
          onChange={handleChange}
          placeholder="e.g. 70 kg"
        />
        <label>Waist Circumference</label>
        <input
          type="number"
          name="bodyComposition.waistCircumference"
          value={healthData.bodyComposition.waistCircumference}
          onChange={handleChange}
          placeholder="e.g. 80 cm"
        />
        <label>BMI</label>
        <input
          type="number"
          name="bodyComposition.BMI"
          value={healthData.bodyComposition.BMI}
          onChange={handleChange}
          placeholder="e.g. 24.2"
        />

        {/* Blood Tests */}
        <h3>Blood Tests</h3>
        <label>Blood Sugar</label>
        <input
          type="number"
          name="bloodTests.bloodSugar"
          value={healthData.bloodTests.bloodSugar}
          onChange={handleChange}
          placeholder="e.g. 90 mg/dL"
        />

        {/* Cholesterol */}
        <h4>Cholesterol</h4>
        <label>HDL</label>
        <input
          type="number"
          name="bloodTests.cholesterol.HDL"
          value={healthData.bloodTests.cholesterol.HDL}
          onChange={handleChange}
          placeholder="e.g. 60 mg/dL"
        />
        <label>LDL</label>
        <input
          type="number"
          name="bloodTests.cholesterol.LDL"
          value={healthData.bloodTests.cholesterol.LDL}
          onChange={handleChange}
          placeholder="e.g. 100 mg/dL"
        />
        <label>Triglycerides</label>
        <input
          type="number"
          name="bloodTests.cholesterol.triglycerides"
          value={healthData.bloodTests.cholesterol.triglycerides}
          onChange={handleChange}
          placeholder="e.g. 150 mg/dL"
        />
        <label>Total Cholesterol</label>
        <input
          type="number"
          name="bloodTests.cholesterol.totalCholesterol"
          value={healthData.bloodTests.cholesterol.totalCholesterol}
          onChange={handleChange}
          placeholder="e.g. 200 mg/dL"
        />

        {/* Complete Blood Count */}
        <h4>Complete Blood Count</h4>
        <label>Hemoglobin</label>
        <input
          type="number"
          name="bloodTests.completeBloodCount.hemoglobin"
          value={healthData.bloodTests.completeBloodCount.hemoglobin}
          onChange={handleChange}
          placeholder="e.g. 15 g/dL"
        />
        <label>Platelets</label>
        <input
          type="number"
          name="bloodTests.completeBloodCount.platelets"
          value={healthData.bloodTests.completeBloodCount.platelets}
          onChange={handleChange}
          placeholder="e.g. 250,000 cells/mcL"
        />
        <label>White Blood Cells</label>
        <input
          type="number"
          name="bloodTests.completeBloodCount.whiteBloodCells"
          value={healthData.bloodTests.completeBloodCount.whiteBloodCells}
          onChange={handleChange}
          placeholder="e.g. 7,000 cells/mcL"
        />
        <label>Red Blood Cells</label>
        <input
          type="number"
          name="bloodTests.completeBloodCount.redBloodCells"
          value={healthData.bloodTests.completeBloodCount.redBloodCells}
          onChange={handleChange}
          placeholder="e.g. 5 million cells/mcL"
        />

        {/* Thyroid Function Tests */}
        <h4>Thyroid Function Tests</h4>
        <label>T4</label>
        <input
          type="number"
          name="bloodTests.thyroidFunctionTests.T4"
          value={healthData.bloodTests.thyroidFunctionTests.T4}
          onChange={handleChange}
          placeholder="e.g. 8.5 µg/dL"
        />
        <label>T3</label>
        <input
          type="number"
          name="bloodTests.thyroidFunctionTests.T3"
          value={healthData.bloodTests.thyroidFunctionTests.T3}
          onChange={handleChange}
          placeholder="e.g. 1.2 ng/mL"
        />
        <label>TSH</label>
        <input
          type="number"
          name="bloodTests.thyroidFunctionTests.TSH"
          value={healthData.bloodTests.thyroidFunctionTests.TSH}
          onChange={handleChange}
          placeholder="e.g. 2.5 mIU/L"
        />

        {/* Urinalysis */}
        <h3>Urinalysis</h3>
        <label>Blood</label>
        <input
          type="text"
          name="urinalysis.blood"
          value={healthData.urinalysis.blood}
          onChange={handleChange}
        />
        <label>Ketones</label>
        <input
          type="text"
          name="urinalysis.ketones"
          value={healthData.urinalysis.ketones}
          onChange={handleChange}
        />
        <label>Protein</label>
        <input
          type="text"
          name="urinalysis.protein"
          value={healthData.urinalysis.protein}
          onChange={handleChange}
        />
        <label>Glucose</label>
        <input
          type="text"
          name="urinalysis.glucose"
          value={healthData.urinalysis.glucose}
          onChange={handleChange}
        />

        {/* ECG */}
        <h3>ECG</h3>
        <label>Rhythm</label>
        <input
          type="text"
          name="ECG.rhythm"
          value={healthData.ECG.rhythm}
          onChange={handleChange}
        />

        <button type="submit" className="button">Submit Health Data</button>
      </form>
    </div>
  );
}

export default Home;
