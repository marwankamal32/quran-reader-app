import { useState } from 'react';

interface RecordButtonProps {
  onRecordingComplete: () => void;
}

export default function RecordButton({ onRecordingComplete }: RecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleRecordToggle = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setRecordingTime(0);
      onRecordingComplete();
    } else {
      // Start recording
      setIsRecording(true);
      // Simulate recording timer
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 60) { // Auto-stop after 60 seconds
            setIsRecording(false);
            clearInterval(timer);
            onRecordingComplete();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleRecordToggle}
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg ${
          isRecording 
            ? 'bg-red-600 animate-pulse'
            : 'bg-gradient-to-r from-green-500 to-green-600'}
        `}
      >
        <span className="text-xl">{isRecording ? '⏹️' : '🎤'}</span>
      </button>
      
      {isRecording && (
        <div className="mt-2 text-xs text-green-400 font-mono">
          {formatTime(recordingTime)}
        </div>
      )}
    </div>
  );
}
