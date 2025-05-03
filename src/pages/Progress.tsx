import { useState } from 'react';

import ProgressHeader from '../components/ProgressHeader';

import CalendarGrid from '../components/CalendarGrid';

import DonationSettings from '../components/DonationSettings';

export default function Progress() {
  const [donationPerMiss, setDonationPerMiss] = useState(5);
  return (
    <div className="min-h-screen bg-white p-4 pb-24">
      <h1 className="text-2xl font-bold mb-4">Your Progress</h1>

      {/* Summary Cards */}
      {<ProgressHeader completed={15} missed={3} donated={15} />}

      {/* Calendar */}
      <CalendarGrid />

      {/* Donation Settings */}
      <DonationSettings
        donationPerMiss={donationPerMiss}
        setDonationPerMiss={setDonationPerMiss}
      />
    </div>
  );
}
