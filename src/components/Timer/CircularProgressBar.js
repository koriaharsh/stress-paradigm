import React, { useState, useEffect } from 'react';
import './AnalogTimer.css';

function CircularProgressBar({ progress, strokeWidth, radius, seconds }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const circumference = 2 * Math.PI * radius;
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
  }, [progress, radius]);

  return (
    <div className="circular-progress-bar">
      <svg>
        <circle
          className="background"
          cx="50%"
          cy="50%"
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress"
          cx="50%"
          cy="50%"
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
          strokeDasharray={`${2 * Math.PI * (radius - strokeWidth / 2)}`}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="progress-text">{seconds}sec</span>
    </div>
  );
}

export default CircularProgressBar;
