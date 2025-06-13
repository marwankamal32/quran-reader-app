import BottomNavigation from '../components/BottomNavigation';

export default function Profile() {
  const userStats = {
    streakDays: 7,
    donationsSaved: "$35"
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden pb-16">
      {/* Header */}
      <div className="pt-4 pb-1 px-4 text-center border-b border-gray-700">
        <h1 className="text-lg font-bold">Profile</h1>
      </div>

      {/* Profile Content */}
      <div className="flex-1 flex flex-col items-center px-4 py-6">
        {/* Profile Avatar & Name */}
        {/* <div className="mb-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-xl mb-3 mx-auto">
            👤
          </div>
          <h2 className="text-base font-bold">Abdullah</h2>
        </div> */}
        
        {/* Key Stats */}
        {/* <div className="w-full max-w-xs flex justify-between mb-8">
          <div className="text-center px-4">
            <p className="text-2xl font-bold text-green-400">{userStats.streakDays}</p>
            <p className="text-xs text-gray-300">Day Streak</p>
          </div>
          
          <div className="text-center px-4">
            <p className="text-2xl font-bold text-green-400">{userStats.donationsSaved}</p>
            <p className="text-xs text-gray-300">Saved</p>
          </div>
        </div> */}
        
        {/* Essential Settings */}
        <div className="w-full max-w-xs space-y-2">
          <SettingsItem 
            icon="⚙️" 
            label="Notification Settings" 
          />
          <SettingsItem 
            icon="💳" 
            label="Payment Methods" 
          />
          <SettingsItem 
            icon="📊" 
            label="Reading Statistics" 
          />
          <SettingsItem 
            icon="❓" 
            label="Help & Support" 
          />
          <SettingsItem 
            icon="🚪" 
            label="Sign Out" 
          />
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
    <span>
      <button className="w-full flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-700/40 transition-colors">
        <div className="flex items-center gap-3">
          <span>{icon}</span>
          <span className="text-sm">{label}</span>
        </div>
        <span className="text-gray-400">›</span>
      </button>
    </span>
  );
}
