import BottomNavigation from '../components/BottomNavigation';

export default function Profile() {
  const userStats = {
    streakDays: 7,
    donationsSaved: "$35"
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-indigo-800 text-white overflow-hidden pb-16">
      {/* Header */}
      <div className="pt-4 pb-1 px-4 text-center border-b border-indigo-700">
        <h1 className="text-lg font-bold">Profile</h1>
      </div>

      {/* Profile Content */}
      <div className="flex-1 flex flex-col items-center px-4 py-6">
        {/* Profile Avatar & Name */}
        <div className="mb-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-xl mb-3 mx-auto">
            👤
          </div>
          <h2 className="text-base font-bold">Abdullah</h2>
        </div>
        
        {/* Key Stats */}
        <div className="w-full max-w-xs flex justify-between mb-8">
          {/* Current Streak */}
          <div className="text-center px-4">
            <p className="text-2xl font-bold text-amber-300">{userStats.streakDays}</p>
            <p className="text-xs text-indigo-200">Day Streak</p>
          </div>
          
          {/* Donations Saved */}
          <div className="text-center px-4">
            <p className="text-2xl font-bold text-amber-300">{userStats.donationsSaved}</p>
            <p className="text-xs text-indigo-200">Saved</p>
          </div>
        </div>
        
        {/* Essential Settings */}
        <div className="w-full max-w-xs">
          <ul className="rounded-lg overflow-hidden border border-indigo-700/50">
            <SettingsItem icon="💰" label="Daily Amount" />
            <SettingsItem icon="💳" label="Payment Method" />
            <SettingsItem icon="🕒" label="Daily Reminder Time" />
          </ul>
          
          {/* Sign Out Button */}
          <button className="w-full mt-6 py-2.5 rounded-lg bg-indigo-800/50 border border-indigo-700/50 text-sm font-medium">
            Sign Out
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

interface SettingsItemProps {
  icon: string;
  label: string;
}

function SettingsItem({ icon, label }: SettingsItemProps) {
  return (
    <li>
      <button className="w-full flex items-center justify-between p-3 bg-indigo-800/30 hover:bg-indigo-700/40 transition-colors">
        <div className="flex items-center gap-3">
          <span>{icon}</span>
          <span className="text-sm">{label}</span>
        </div>
        <span className="text-indigo-400">›</span>
      </button>
    </li>
  );
}
