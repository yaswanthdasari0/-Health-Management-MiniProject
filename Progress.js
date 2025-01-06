// Progress.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Progress.css';

function Progress() {
  const { userId } = useParams();
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/healthchecks/${userId}`);
        setProgressData(response.data);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };
    fetchData();
  }, [userId]);
  const generateChartData = (dataKey) => {
    const labels = progressData.map(data => new Date(data.createdAt).toLocaleDateString('en-US'));

    const datasets = Object.keys(progressData[0][dataKey] || {}).map((key) => ({
      label: formatLabel(key),
      data: progressData.map(data => {
        const value = data[dataKey] && data[dataKey][key];
        return typeof value === 'object' ? null : value || 0;  // Ignore objects, return 0 if null
      }),
      borderColor: getColor(key),
      tension: 0.1,
      fill: false,
    }));

    return {
      labels,
      datasets,
    };
  };

  const formatLabel = (label) => label.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  const getColor = (key) => {
    const colors = {
      systolic: 'rgba(255, 99, 132, 1)',
      diastolic: 'rgba(54, 162, 235, 1)',
      bodyTemperature: 'rgba(75, 192, 192, 1)',
      heartRate: 'rgba(153, 102, 255, 1)',
      HDL: 'rgba(255, 159, 64, 1)',
      LDL: 'rgba(255, 205, 86, 1)',
      TSH: 'rgba(201, 203, 207, 1)',
      bloodSugar: 'rgba(54, 162, 235, 1)',
      weight: 'rgba(255, 159, 64, 1)',
      height: 'rgba(153, 102, 255, 1)',
      BMI: 'rgba(75, 192, 192, 1)',
    };
    return colors[key] || 'rgba(100, 100, 100, 1)'; // Default color if not specified
  };

  const checkHealthStatus = (value, key) => {
    const thresholds = {
      systolic: { min: 90, max: 120 },
      diastolic: { min: 60, max: 80 },
      bodyTemperature: { min: 36.1, max: 37.2 },
      heartRate: { min: 60, max: 100 },
      HDL: { min: 40, max: 60 },
      LDL: { max: 130 },
      TSH: { min: 0.5, max: 4.5 },
      bloodSugar: { min: 70, max: 100 },
      BMI: { min: 18.5, max: 24.9 },
    };
    const { min, max } = thresholds[key] || {};
    return min !== undefined && max !== undefined
      ? min <= value && value <= max
      : max !== undefined
      ? value <= max
      : true;
  };

  const renderNestedData = (data, parentKey) => {
    return Object.entries(data || {}).map(([key, value]) => {
      const label = `${formatLabel(parentKey)} - ${formatLabel(key)}`;
      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key}>
            <p>{label}:</p>
            <div style={{ paddingLeft: '20px' }}>
              {renderNestedData(value, key)}
            </div>
          </div>
        );
      }
      return (
        <p key={key}>
          {label}: {value !== null ? value : 'N/A'} -{' '}
          {checkHealthStatus(value, key) ? <span className="good">Good</span> : <span className="bad">Out of Range</span>}
        </p>
      );
    });
  };

  const calculateBMI = (height, weight) => {
    if (!height || !weight) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  if (progressData.length === 0) return <p>Loading data...</p>;

  return (
    <div className="progress-container">
      <h2>Progress for User ID: {userId}</h2>

      <div className="chart-section">
        <h3>Vital Signs</h3>
        <Line data={generateChartData('vitalSigns')} />
        <div className="health-status">
          {renderNestedData(progressData[0].vitalSigns, 'Vital Signs')}
        </div>
      </div>

      <div className="chart-section">
        <h3>Body Composition</h3>
        <Line data={generateChartData('bodyComposition')} />
        <div className="health-status">
          {renderNestedData(progressData[0].bodyComposition, 'Body Composition')}
          <p>BMI: {calculateBMI(progressData[0].bodyComposition.height, progressData[0].bodyComposition.weight)} -{' '}
            {checkHealthStatus(calculateBMI(progressData[0].bodyComposition.height, progressData[0].bodyComposition.weight), 'BMI')
              ? <span className="good">Good</span>
              : <span className="bad">Out of Range</span>}
          </p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Blood Tests</h3>
        <Line data={generateChartData('bloodTests')} />
        <div className="health-status">
          {Object.entries(progressData[0].bloodTests || {}).map(([key, value]) =>
            typeof value === 'object' && value !== null ? renderNestedData(value, key) : (
              <p key={key}>
                {formatLabel(key)}: {value !== null ? value : 'N/A'} -{' '}
                {checkHealthStatus(value, key) ? <span className="good">Good</span> : <span className="bad">Out of Range</span>}
              </p>
            )
          )}
        </div>
      </div>

      <div className="chart-section">
        <h3>Urinalysis</h3>
        <Line data={generateChartData('urinalysis')} />
        <div className="health-status">
          {renderNestedData(progressData[0].urinalysis, 'Urinalysis')}
        </div>
      </div>

      <div className="chart-section">
        <h3>ECG</h3>
        <Line data={generateChartData('ECG')} />
        <div className="health-status">
          <p>Rhythm: {progressData[0].ECG.rhythm || 'N/A'} - {progressData[0].ECG.rhythm === 'normal' ? <span className="good">Good</span> : <span className="bad">Abnormal</span>}</p>
        </div>
      </div>
    </div>
  );
}

export default Progress;