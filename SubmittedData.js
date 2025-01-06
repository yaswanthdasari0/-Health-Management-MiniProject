// SubmittedData.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import axios from 'axios';
import './SubmittedData.css';

function SubmittedData() {
  const { userId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/healthchecks/${userId}`);
        setSubmittedData(response.data);
      } catch (error) {
        console.error('Error fetching submitted data:', error);
      }
    };
    fetchData();
  }, [userId]);

  const renderFields = (data) => {
    return (
      Object.entries(data || {}).map(([key, value]) => {
        // Skip unwanted fields (_id, __v, imaging tests, cancer screening)
        if (key === '_id' || key === '__v' || key === 'Imaging tests' || key === 'Cancer Screening') return null;

        // Format dates for `createdAt` and `updatedAt`
        if (key === 'createdAt' || key === 'updatedAt') {
          value = new Date(value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        }

        return (
          <div key={key} className="data-field">
            <strong className="field-label">{formatLabel(key)}:</strong> 
            <span className="field-value">{typeof value === 'object' ? renderFields(value) : value || 'N/A'}</span>
          </div>
        );
      })
    );
  };

  const formatLabel = (label) => {
    return label.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  };

  const handleProgressClick = () => {
    navigate(`/progress/${userId}`); // Use navigate to redirect
  };

  if (submittedData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="submitted-data-container">
      <button className="progress-button" onClick={handleProgressClick}>
        View Progress
      </button>
      <h2 className="page-title">Submitted Health Checkup Data for User ID: {userId}</h2>
      <div className="card-grid">
        {submittedData.map((submission, index) => (
          <div key={index} className="submission-card">
            <h3 className="submission-title">Checkup {index + 1}</h3>
            {renderFields(submission)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubmittedData;