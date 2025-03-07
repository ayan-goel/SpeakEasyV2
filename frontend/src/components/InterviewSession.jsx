import React, { useState, useRef, useEffect } from 'react';
import VideoRecorder from './VideoRecorder';
import TranscriptBox from './TranscriptBox';
import Timer from './Timer';
import '../styles/InterviewSession.css';

const InterviewSession = () => {
  const [question, setQuestion] = useState('');
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(true);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    // Fetch question from backend when component mounts
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/question');
      const data = await response.json();
      setQuestion(data.question);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  return (
    <div className="interview-container">
      <div className="question-box">
        <h2>Interview Question:</h2>
        <p>{question}</p>
      </div>

      <VideoRecorder onTranscriptUpdate={setTranscript} />

      <div className="controls">
        <Timer />
        <button 
          onClick={() => setIsTranscriptVisible(!isTranscriptVisible)}
          className="toggle-transcript"
        >
          {isTranscriptVisible ? 'Hide Transcript' : 'Show Transcript'}
        </button>
      </div>

      {isTranscriptVisible && <TranscriptBox transcript={transcript} />}
    </div>
  );
};

export default InterviewSession; 