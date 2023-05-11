import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ leaderboardData }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {leaderboardData && leaderboardData.length > 0 ? (
        <div className="score-container">
          {leaderboardData.map((score, index) => (
            <div className="score-row" key={index}>
              <span className="score-index">{index + 1}  </span>
              <span className="score-player">{score.playerName}  </span>
              <span className="score-time">{score.winTime} sec  </span>
            </div>
          ))}
        </div>
      ) : (
        <p>No scores available</p>
      )}
    </div>
  );
};

export default Leaderboard;
