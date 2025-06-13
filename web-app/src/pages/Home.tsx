import { useState } from 'react';
import RecordButton from '../components/RecordButton';
import BottomNavigation from '../components/BottomNavigation';

export default function Home() {
  // State to track recording status
  const [hasRecorded, setHasRecorded] = useState(false);
  
  // Function to handle recording completion
  const handleRecordingComplete = () => {
    setHasRecorded(true);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden pb-16">
      {/* Title Bar - Smaller */}
      <div className="pt-4 pb-1 px-4 text-center border-b border-gray-700">
        <h1 className="text-lg font-bold">Daily Quran Reading</h1>
        <div className="flex items-center justify-center mt-0.5">
          <span className="w-6 h-px bg-green-400/60"></span>
          <p className="text-xs text-gray-300 mx-2 py-0.5">Begin your journey with Allah's words</p>
          <span className="w-6 h-px bg-green-400/60"></span>
        </div>
      </div>

      {/* Main Content - with bottom padding for navigation */}
      <div className="flex-1 flex flex-col items-center justify-evenly px-4 py-2">
        {/* Recording Status - Improved Design */}
        <div className={`w-full max-w-xs rounded-lg p-3 border border-opacity-20 transition-colors duration-300 ${
          hasRecorded ? 'bg-green-900/30 border-green-400' : 'bg-gray-700/30 border-green-400'
        }`}>
          <div className="flex items-center">
            <div className={`w-2.5 h-2.5 rounded-full mr-2 ${
              hasRecorded ? 'bg-green-400 animate-pulse' : 'bg-green-500'
            }`}></div>
            <h2 className="text-sm font-medium">Recording Status</h2>
          </div>
          <p className={`text-xs mt-1.5 pl-4.5 ${
            hasRecorded ? 'text-green-300' : 'text-green-400'
          }`}>
            {hasRecorded 
              ? "Today's reading completed ✓" 
              : "You haven't recorded today yet"}
          </p>
        </div>

        {/* Record Button - Centered and Smaller */}
        <div className="flex flex-col items-center -my-2">
          <div className="relative">
            <RecordButton onRecordingComplete={handleRecordingComplete} />
          </div>
          <p className="mt-2 text-xs font-medium">
            Tap to record your Quran reading
          </p>
        </div>

        {/* Daily Commitment - Green Theme */}
        <div className={`w-full max-w-xs rounded-lg p-3 border border-opacity-20 transition-colors duration-300 ${
          hasRecorded ? 'bg-green-800/30 border-green-400' : 'bg-gray-700/30 border-green-500'
        }`}>
          <div className="flex items-center">
            <div className={`w-2.5 h-2.5 rounded-full mr-2 ${
              hasRecorded ? 'bg-green-400' : 'bg-green-500'
            }`}></div>
            <h2 className="text-sm font-medium">Daily Commitment</h2>
          </div>
          <p className={`text-xs mt-1.5 pl-4.5 ${
            hasRecorded ? 'text-green-300' : 'text-green-400'
          }`}>
            {hasRecorded 
              ? "Commitment fulfilled! No donation needed." 
              : "$5 will be donated if not completed today."}
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
