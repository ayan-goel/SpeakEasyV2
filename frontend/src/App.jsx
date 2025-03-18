import React from 'react';
import './App.css';
import InterviewLayout from './components/InterviewLayout';

function App() {
  const sampleQuestion = "Tell me about a challenging project you worked on and how you overcame obstacles to complete it.";

  return (
    <div className="App">
      <InterviewLayout question={sampleQuestion} />
    </div>
  );
}

export default App;
