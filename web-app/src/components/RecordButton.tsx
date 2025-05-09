import { useState } from 'react';

interface RecordButtonProps {
  onRecordingComplete?: () => void;
}

const RecordButton = ({ onRecordingComplete }: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.start();

      recorder.ondataavailable = (event) => {
        const audioBlob = new Blob([event.data], { type: 'audio/wav' });
        console.log('Audio Blob', audioBlob);
      };

      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access denied', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      
      // Call the callback function when recording is complete
      if (onRecordingComplete) {
        onRecordingComplete();
      }
    }
  };

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`
        w-16 h-16 rounded-full 
        flex items-center justify-center
        shadow-md 
        ${isRecording 
          ? 'bg-red-600 animate-pulse' 
          : 'bg-gradient-to-r from-amber-500 to-amber-600'}
        ${isRecording ? 'shadow-red-700/50' : 'shadow-amber-700/50'}
        transform transition-all duration-200
        ${isRecording ? 'scale-110' : 'hover:scale-105 active:scale-95'}
      `}
    >
      <span className="text-xl">{isRecording ? '⏹️' : '🎤'}</span>
    </button>
  );
};

export default RecordButton;
