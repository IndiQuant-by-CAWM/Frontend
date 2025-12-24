import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Profile.css';

export default function Profile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch user profile
    fetch(`/api/v1/leaderboard/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        generateChartData(data);
      });
  }, [userId]);

  const generateChartData = (data) => {
    // Mock data generation
    const mock = Array.from({ length: 10 }, (_, i) => ({
      submission: i + 1,
      score: Math.random() * 0.5 + 0.5,
    }));
    setChartData(mock);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-page container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="profile-header">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`}
          alt={profile.username}
          className="profile-avatar"
        />
        <div className="profile-info">
          <h1>{profile.display_name || profile.username}</h1>
          <p className="username">@{profile.username}</p>
          {profile.institution && <p className="institution">📚 {profile.institution}</p>}
          {profile.bio && <p className="bio">{profile.bio}</p>}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-label">Total Submissions</div>
          <div className="stat-large">{profile.total_submissions}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Tournaments</div>
          <div className="stat-large">{profile.total_tournaments}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Avg Score</div>
          <div className="stat-large">{profile.average_score?.toFixed(3) || '—'}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Best Score</div>
          <div className="stat-large text-gold">{profile.best_score?.toFixed(3) || '—'}</div>
        </div>
      </div>

      {/* Rankings */}
      <div className="rankings-section">
        <h3>Current Rankings</h3>
        <div className="rankings-grid">
          <div className="rank-box">
            <div className="rank-period">7-Day</div>
            <div className="rank-value">#{profile.rank_7d || '—'}</div>
          </div>
          <div className="rank-box">
            <div className="rank-period">30-Day</div>
            <div className="rank-value">#{profile.rank_30d || '—'}</div>
          </div>
          <div className="rank-box">
            <div className="rank-period">All-Time</div>
            <div className="rank-value">#{profile.rank_all_time || '—'}</div>
          </div>
        </div>
      </div>

      {/* Badges */}
      {profile.badges && profile.badges.length > 0 && (
        <div className="badges-section">
          <h3>Achievements</h3>
          <div className="badges">
            {profile.badges.map((badge) => (
              <div key={badge} className={`badge badge-lg badge-${badge}`}>
                ⭐ {badge}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Chart */}
      <div className="chart-section">
        <h3>Performance Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="submission" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#00dbc7" dot={{ fill: '#ffc133' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
