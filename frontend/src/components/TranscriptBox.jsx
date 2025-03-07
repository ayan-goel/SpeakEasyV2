import React from 'react';
import '../styles/TranscriptBox.css';

const TranscriptBox = ({ transcript }) => {
  return (
    <div className="transcript-box">
      <h3>Real-time Transcript</h3>
      <div className="transcript-content">
        {transcript || 'Transcript will appear here...'}
      </div>
    </div>
  );
};

export default TranscriptBox; 