import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Crowdsourced Quant Intelligence for Indian Markets
          </h1>
          <p className="hero-subtitle">
            Submit your trading signals. Get ranked. Win prizes. Shape the future of quantitative investing.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary btn-large">
              Start Trading Intelligence 🚀
            </Link>
            <Link to="/leaderboard" className="btn btn-secondary btn-large">
              View Leaderboard
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">500+</div>
              <div className="stat-label">Active Participants</div>
            </div>
            <div className="stat">
              <div className="stat-value">200</div>
              <div className="stat-label">Stocks Tracked</div>
            </div>
            <div className="stat">
              <div className="stat-value">₹1M</div>
              <div className="stat-label">Prize Pool</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-graphic">
            <svg viewBox="0 0 400 400" className="chart-animation">
              <polyline
                points="50,300 100,250 150,200 200,150 250,100 300,120 350,80"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00dbc7" />
                  <stop offset="100%" stopColor="#ffc133" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why IndiQuant?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real Market Data</h3>
            <p>Trade signals based on real NSE 200/500 stocks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Fair Ranking</h3>
            <p>Transparent scoring using Spearman correlation</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Real Rewards</h3>
            <p>Win prizes and recognition for forecasting skill</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Platform</h3>
            <p>Enterprise-grade security and data privacy</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to show your quant skills?</h2>
        <Link to="/signup" className="btn btn-primary btn-large">
          Join Now → Win Prizes 🎯
        </Link>
      </section>
    </div>
  );
}
