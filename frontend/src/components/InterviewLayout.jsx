import React, { useState, useEffect } from 'react';
import '../styles/InterviewSession.css';
import Timer from './Timer';
import VideoRecorder from './VideoRecorder';
import TranscriptBox from './TranscriptBox';

const InterviewLayout = ({ question }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  
  const startRecording = () => {
    setIsRecording(true);
    setTimerActive(true);
    // Add your actual recording logic here
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    setTimerActive(false);
    // Add your actual stop recording logic here
  };
  
  const restartRecording = () => {
    setIsRecording(false);
    setTimerActive(false);
    // Reset any other state as needed
    
    // Slight delay before restarting
    setTimeout(() => {
      setIsRecording(true);
      setTimerActive(true);
    }, 500);
  };
  
  const toggleTranscript = () => {
    setShowTranscript(!showTranscript);
  };
  
  return (
    <div className="interview-container">
      <h2 className="session-title">Interview Practice</h2>
      
      <div className="question-box">
        <div className="question-text">{question || "Tell me about a time when you faced a challenging situation at work and how you resolved it."}</div>
      </div>
      
      <div className="interview-layout">
        <div className="left-column">
          <VideoRecorder isRecording={isRecording} />
        </div>
        
        <div className="right-column">
          <div className="recording-actions">
            <Timer active={timerActive} />
            
            <div className="action-buttons">
              {!isRecording ? (
                <button className="start-recording" onClick={startRecording}>
                  Start Recording
                </button>
              ) : (
                <>
                  <button className="start-recording" onClick={stopRecording}>
                    Stop Recording
                  </button>
                  <button className="restart-recording" onClick={restartRecording}>
                    Restart
                  </button>
                </>
              )}
              
              <button className="toggle-transcript" onClick={toggleTranscript}>
                {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
              </button>
            </div>
            
            {isRecording && (
              <div className="recording-status">
                <div className="recording-indicator"></div>
                <span>Recording in progress...</span>
              </div>
            )}
          </div>
          
          {showTranscript && (
            <TranscriptBox transcript={transcript} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewLayout; 