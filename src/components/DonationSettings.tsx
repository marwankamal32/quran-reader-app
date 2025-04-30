interface DonationSettingsProps {
    donationPerMiss: number;
    setDonationPerMiss: React.Dispatch<React.SetStateAction<number>>;
  }


export default function DonationSettings({ donationPerMiss, setDonationPerMiss } : DonationSettingsProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Donation Settings</h2>
            <div className="flex items-center gap-2">
                <button
                className="bg-gray-200 px-3 py-1 rounded"
                onClick={() => setDonationPerMiss((prev: number) => Math.max(1, prev-1))}>
                    -
                </button>
                <span className="text-lg font-semibold">${donationPerMiss}</span>
                <button
                className="bg-gray-200 px-3 py-1 rounded"
                onClick={() => setDonationPerMiss((prev: number) => prev + 1)}>
                    +
                </button>
            </div>

            <p className="text-center text-gray-500">
                You will donate <span className="font-semibold">${donationPerMiss}</span> for every missed day.
            </p>
        </div>
    )
}