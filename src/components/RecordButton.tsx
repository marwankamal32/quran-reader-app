import { useState } from "react";

const RecordButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.start();

      recorder.ondataavailable = (event) => {
        const audioBlob = new Blob([event.data], { type: "audio/wav" });

        console.log("Audio Blob", audioBlob);
      };

      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-3xl shadow-lg"
    >
      🎤
    </button>
  );
};

export default RecordButton;
