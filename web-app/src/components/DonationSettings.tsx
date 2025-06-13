interface DonationSettingsProps {
  donationPerMiss: number;
  setDonationPerMiss: (value: number | ((prev: number) => number)) => void;
}

export default function DonationSettings({
  donationPerMiss,
  setDonationPerMiss,
}: DonationSettingsProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow m-4">
      <h2 className="font-semibold mb-2 text-white">Donation Settings</h2>
      <div className="flex items-center gap-2">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
          onClick={() =>
            setDonationPerMiss((prev: number) => Math.max(1, prev - 1))
          }
        >
          -
        </button>
        <span className="text-lg font-semibold text-white">${donationPerMiss}</span>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
          onClick={() => setDonationPerMiss((prev: number) => prev + 1)}
        >
          +
        </button>
      </div>

      <p className="text-center text-gray-300 mt-2">
        You will donate{' '}
        <span className="font-semibold text-green-400">${donationPerMiss}</span> for every
        missed day.
      </p>
    </div>
  );
}
