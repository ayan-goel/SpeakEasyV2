import React, { useRef, useEffect, useState } from 'react';
import '../styles/VideoRecorder.css';

const VideoRecorder = ({ onTranscriptUpdate }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    initializeMedia();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initializeMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  const startRecording = () => {
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      // Here you would typically send the video data to your backend
      // For now, we'll just create a URL for preview
      const videoUrl = URL.createObjectURL(event.data);
      console.log('Recording saved:', videoUrl);
    }
  };

  return (
    <div className="video-recorder">
      <video 
        ref={videoRef} 
        autoPlay 
        muted 
        playsInline
        className="video-preview"
      />
      <div className="recording-controls">
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder; 