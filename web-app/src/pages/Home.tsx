import RecordButton from '../components/RecordButton';
import TodaysReading from '../components/TodaysReading';
import HeaderSection from '../components/HeaderSection';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <HeaderSection />

      {/* Today's Reading Card */}
      <TodaysReading />

      {/* Record Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <RecordButton />
        <p className="mt-4 font-semibold text-indigo-800">
          Tap to record your Quran reading
        </p>
        <p className="text-sm text-indigo-400">Minimum 30 seconds required</p>
      </div>
    </div>
  );
}
