import React, { useState, useEffect } from 'react';
import './BatchProgress.css';

export default function BatchProgress() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Poll batch status every 2 seconds
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/v1/submit/batch/status');
        const data = await response.json();
        setStatus(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching batch status:', error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="batch-loading">Loading batch status...</div>;
  }

  if (!status) {
    return null;
  }

  const { progress, current_step, predictions_queued, stats, next_batch_run } = status;
  const nextRun = new Date(next_batch_run).toLocaleTimeString();

  return (
    <div className="batch-progress-container">
      <div className="batch-header">
        <h2>🎬 Batch Prediction Processor</h2>
        <span className={`batch-status ${status.status}`}>
          {status.status === 'processing' ? '⚙️ Processing' : '✅ Ready'}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-text">
          <span className="progress-percent">{progress}%</span>
          <span className="progress-step">{current_step}</span>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="queue-stats">
        <div className="stat-item">
          <div className="stat-label">📤 In Queue</div>
          <div className="stat-value">{predictions_queued}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">⏰ Next Run</div>
          <div className="stat-value">{nextRun}</div>
        </div>
      </div>

      {/* Results Stats */}
      {stats && (stats.total_submissions > 0) && (
        <div className="results-section">
          <h3>📊 Latest Batch Results</h3>
          <div className="results-grid">
            <div className="result-card profitable">
              <div className="result-icon">✅</div>
              <div className="result-count">{stats.profitable}</div>
              <div className="result-label">Profitable</div>
              <div className="result-percent">
                {((stats.profitable / stats.total_submissions) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="result-card neutral">
              <div className="result-icon">⚠️</div>
              <div className="result-count">{stats.neutral}</div>
              <div className="result-label">Neutral</div>
              <div className="result-percent">
                {((stats.neutral / stats.total_submissions) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="result-card trash">
              <div className="result-icon">❌</div>
              <div className="result-count">{stats.trash}</div>
              <div className="result-label">Trash</div>
              <div className="result-percent">
                {((stats.trash / stats.total_submissions) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="result-card correlation">
              <div className="result-icon">📈</div>
              <div className="result-count">{stats.global_spearman.toFixed(3)}</div>
              <div className="result-label">Spearman</div>
              <div className="result-percent">Correlation</div>
            </div>
          </div>

          <div className="total-submissions">
            Total Predictions Scored: <strong>{stats.total_submissions}</strong>
          </div>
        </div>
      )}

      {/* Processing Details */}
      {status.status === 'processing' && (
        <div className="processing-details">
          <div className="step-indicator">
            <div className="step">1️⃣ Fetch Data</div>
            <div className="step">2️⃣ Train Model</div>
            <div className="step">3️⃣ Aggregate</div>
            <div className="step">4️⃣ Score</div>
            <div className="step">5️⃣ Save</div>
          </div>
        </div>
      )}
    </div>
  );
}
