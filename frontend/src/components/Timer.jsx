import React, { useState, useEffect } from 'react';
import '../styles/Timer.css';

const Timer = ({ active }) => {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    let interval = null;
    
    if (active) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!active && time !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [active, time]);
  
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="timer">
      <div className="time-display">{formatTime(time)}</div>
      {/* Original controls are hidden via CSS, we're using external controls now */}
      <div className="timer-controls" style={{ display: 'none' }}>
        <button>Start</button>
        <button>Reset</button>
      </div>
    </div>
  );
};

export default Timer; 