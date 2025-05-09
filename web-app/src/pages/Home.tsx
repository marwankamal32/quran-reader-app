import { useState } from 'react';
import RecordButton from '../components/RecordButton';
import HeaderSection from '../components/HeaderSection';

export default function Home() {
  // State to track recording status
  const [hasRecorded, setHasRecorded] = useState(false);
  
  // Function to handle recording completion
  const handleRecordingComplete = () => {
    setHasRecorded(true);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <HeaderSection />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-6 py-8 space-y-8">
        {/* Recording Status Card */}
        <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <span role="img" aria-label="status" className="text-2xl">
              {hasRecorded ? '✅' : '⏱️'}
            </span>
            <h2 className="font-semibold text-lg">Recording Status</h2>
          </div>
          <p className={`font-medium ${hasRecorded ? 'text-green-600' : 'text-orange-500'}`}>
            {hasRecorded 
              ? "Today's recording completed!" 
              : "You haven't recorded today yet"}
          </p>
        </div>

        {/* Record Button Section */}
        <div className="flex flex-col items-center my-6">
          <RecordButton onRecordingComplete={handleRecordingComplete} />
          <p className="mt-4 font-semibold text-indigo-800">
            Tap to record your Quran reading
          </p>
          <p className="text-sm text-indigo-400">Minimum 30 seconds required</p>
        </div>

        {/* Payment Info Card */}
        <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <span role="img" aria-label="money" className="text-2xl">
              {hasRecorded ? '🎁' : '💰'}
            </span>
            <h2 className="font-semibold text-lg">Daily Reward</h2>
          </div>
          {hasRecorded ? (
            <p className="text-green-600">
              Great job completing today's reading! Your streak is building.
            </p>
          ) : (
            <p className="text-red-500">
              $5 will be automatically donated if you don't complete today's recording.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
