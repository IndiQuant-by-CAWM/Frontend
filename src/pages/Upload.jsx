import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import UploadArea from '../components/UploadArea';
import './Upload.css';

export default function Upload() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const tournamentId = location.state?.tournamentId || 1;
  const [submissions, setSubmissions] = useState([]);

  const handleUpload = async (formData, id) => {
    // API call to backend
    const response = await fetch(`/api/v1/submit/?tournament_id=${id}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');

    const data = await response.json();
    setSubmissions([data, ...submissions]);
    return data;
  };

  if (!isAuthenticated) {
    return <div className="login-required">Please log in to submit predictions</div>;
  }

  return (
    <div className="upload-page">
      <h1>📤 Submit Your Predictions</h1>
      <p>Upload your CSV file with stock predictions</p>

      <UploadArea onUpload={handleUpload} tournamentId={tournamentId} />

      {/* Submission History */}
      {submissions.length > 0 && (
        <section className="submission-history">
          <h3>Recent Submissions</h3>
          <div className="submissions-list">
            {submissions.map((sub) => (
              <div key={sub.id} className="submission-item">
                <span className="submission-date">
                  {new Date(sub.created_at).toLocaleString()}
                </span>
                <span className="submission-status">
                  {sub.is_valid ? '✅ Valid' : '❌ Invalid'}
                </span>
                <span className="submission-id">ID: {sub.id}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
