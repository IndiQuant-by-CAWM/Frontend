import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTournament } from '../hooks/useTournament';
import Countdown from '../components/Countdown';
import BatchProgress from '../components/BatchProgress';
import './Dashboard.css';

export default function Dashboard() {
  const { tournaments, stats, isLoading } = useTournament();

  if (isLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      {/* Batch Processing Status */}
      <BatchProgress />

      {/* Quick Stats */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-label">Your Rank</div>
          <div className="stat-value text-teal">#{stats?.rank || '—'}</div>
          <div className="stat-detail">7-day leaderboard</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Submissions</div>
          <div className="stat-value text-gold">{stats?.submissions || 0}</div>
          <div className="stat-detail">Total submissions</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Score</div>
          <div className="stat-value text-teal">{(stats?.avgScore || 0).toFixed(3)}</div>
          <div className="stat-detail">Spearman correlation</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Badges</div>
          <div className="stat-value text-gold">{stats?.badges || 0}</div>
          <div className="stat-detail">Top-10 achievements</div>
        </div>
      </section>

      {/* Active Tournaments */}
      <section className="tournaments-section">
        <h2>🎮 Active Tournaments</h2>
        <div className="tournaments-grid">
          {tournaments.map((tournament) => (
            <div key={tournament.id} className="tournament-card">
              <div className="tournament-header">
                <h3>{tournament.tournament_name}</h3>
                <span className="status-badge">{tournament.status}</span>
              </div>

              <div className="tournament-info">
                <p>
                  <strong>Universe:</strong> {tournament.universe}
                </p>
                <p>
                  <strong>Horizon:</strong> {tournament.horizon}
                </p>
                <p>
                  <strong>Stocks:</strong> {tournament.stock_count}
                </p>
              </div>

              {/* Tournament Countdown */}
              <div className="tournament-countdown">
                <Countdown endTime={tournament.submission_end} />
              </div>

              <div className="tournament-actions">
                <Link
                  to="/upload"
                  state={{ tournamentId: tournament.id }}
                  className="btn btn-primary"
                >
                  Submit Prediction 📤
                </Link>
                <button className="btn btn-secondary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <Link to="/leaderboard" className="quick-link-card">
          <div className="icon">📊</div>
          <h4>View Leaderboard</h4>
          <p>See current rankings</p>
        </Link>
        <Link to="/upload" className="quick-link-card">
          <div className="icon">📤</div>
          <h4>Submit Predictions</h4>
          <p>Upload CSV file</p>
        </Link>
      </section>
    </div>
  );
}
