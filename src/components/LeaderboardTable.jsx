import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LeaderboardTable.css';

export default function LeaderboardTable({ data, isLoading }) {
  const [sortBy, setSortBy] = useState('rank');

  if (isLoading) {
    return <div className="loading">Loading leaderboard...</div>;
  }

  return (
    <div className="leaderboard-table">
      <table>
        <thead>
          <tr>
            <th onClick={() => setSortBy('rank')}>Rank</th>
            <th onClick={() => setSortBy('username')}>User</th>
            <th onClick={() => setSortBy('score')}>Avg Score</th>
            <th onClick={() => setSortBy('submissions')}>Submissions</th>
            <th>Badges</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.user_id} className={entry.rank <= 10 ? 'top-10' : ''}>
              <td className="rank">
                <span className="rank-badge">#{entry.rank}</span>
              </td>
              <td className="user">
                <Link to={`/profile/${entry.user_id}`} className="user-link">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.user_id}`}
                    alt={entry.username}
                    className="user-avatar-sm"
                  />
                  <span>{entry.username}</span>
                </Link>
              </td>
              <td className="score">{entry.average_score.toFixed(3)}</td>
              <td className="submissions">{entry.submission_count}</td>
              <td className="badges">
                {entry.badges.map((badge) => (
                  <span key={badge} className={`badge badge-${badge}`}>
                    ⭐ {badge}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
