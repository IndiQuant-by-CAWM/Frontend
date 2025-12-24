import React, { useState, useEffect } from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import LeaderboardTable from '../components/LeaderboardTable';
import './Leaderboard.css';

export default function Leaderboard() {
  const [period, setPeriod] = useState('7d');
  const { leaderboardData, isLoading, fetchLeaderboard } = useLeaderboard();

  useEffect(() => {
    fetchLeaderboard(period);
  }, [period]);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <h1>🏆 Global Leaderboard</h1>
        <p>Top performers on the IndiQuant platform</p>
      </div>

      {/* Period Selector */}
      <div className="period-selector">
        <button
          className={`period-btn ${period === '7d' ? 'active' : ''}`}
          onClick={() => setPeriod('7d')}
        >
          7 Days
        </button>
        <button
          className={`period-btn ${period === '30d' ? 'active' : ''}`}
          onClick={() => setPeriod('30d')}
        >
          30 Days
        </button>
        <button
          className={`period-btn ${period === '90d' ? 'active' : ''}`}
          onClick={() => setPeriod('90d')}
        >
          90 Days
        </button>
        <button
          className={`period-btn ${period === 'all_time' ? 'active' : ''}`}
          onClick={() => setPeriod('all_time')}
        >
          All Time
        </button>
      </div>

      {/* Leaderboard Table */}
      <LeaderboardTable data={leaderboardData} isLoading={isLoading} />
    </div>
  );
}
