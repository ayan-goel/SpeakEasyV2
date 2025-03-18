import React, { useRef, useEffect, useState } from 'react';
import '../styles/VideoRecorder.css';

const VideoRecorder = ({ isRecording }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  
  useEffect(() => {
    // Get permission and set up video feed when component mounts
    const setupVideo = async () => {
      try {
        // Request high-quality video with preferred aspect ratio
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: "user"
          }, 
          audio: true 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };
    
    setupVideo();
    
    // Cleanup when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  useEffect(() => {
    // Handle starting/stopping recording based on isRecording prop
    if (isRecording) {
      startCountdown();
    } else {
      stopRecording();
    }
  }, [isRecording]);
  
  const startCountdown = () => {
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          startRecording();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const startRecording = () => {
    if (!streamRef.current) return;
    
    try {
      const recorder = new MediaRecorder(streamRef.current, {
        mimeType: 'video/webm;codecs=vp9,opus'
      });
      const chunks = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        // Do something with the recorded video blob
        // e.g., save it, upload it, or play it back
      };
      
      recorder.start();
      mediaRecorderRef.current = recorder;
    } catch (err) {
      console.error("Error starting recording:", err);
      // Fallback to a more compatible format if vp9 isn't supported
      try {
        const recorder = new MediaRecorder(streamRef.current);
        mediaRecorderRef.current = recorder;
        recorder.start();
      } catch (fallbackErr) {
        console.error("Fallback recording failed:", fallbackErr);
      }
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };
  
  return (
    <div className="video-recorder">
      <div className="video-container">
        {countdown && (
          <div className="countdown">{countdown}</div>
        )}
        <video 
          ref={videoRef} 
          className="video-preview" 
          autoPlay 
          playsInline 
          muted
        />
      </div>
      
      {/* Original controls are hidden via CSS */}
      <div className="recording-controls" style={{ display: 'none' }}>
        <button>Record</button>
      </div>
    </div>
  );
};

export default VideoRecorder; 