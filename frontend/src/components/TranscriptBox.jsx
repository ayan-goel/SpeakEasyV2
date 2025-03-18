import React from 'react';
import '../styles/TranscriptBox.css';

const TranscriptBox = ({ transcript }) => {
  return (
    <div className="transcript-box">
      <h3>Transcript</h3>
      <div className="transcript-content">
        {transcript ? transcript : (
          <div className="empty-transcript">
            Your speech transcript will appear here once you start speaking...
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptBox; 