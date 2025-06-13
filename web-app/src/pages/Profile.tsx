import { useState, useEffect } from 'react';
import BottomNavigation from '../components/BottomNavigation';
import AuthService, { User } from '../services/auth';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (AuthService.isAuthenticated()) {
          const currentUser = AuthService.getUser();
          setUser(currentUser);
          
          // Optionally fetch fresh user data from API
          try {
            const freshUser = await AuthService.getCurrentUser();
            setUser(freshUser);
            AuthService.setUser(freshUser); // Update local storage
          } catch (apiError) {
            console.warn('Failed to fetch fresh user data:', apiError);
            // Keep using cached user data
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        setError('Failed to load user information');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Sign out failed:', error);
      // Force logout even if API call fails
      AuthService.logout();
    }
  };

  const userStats = {
    streakDays: 7,
    donationsSaved: "$35"
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden pb-16">
        <div className="pt-4 pb-1 px-4 text-center border-b border-gray-700">
          <h1 className="text-lg font-bold">Profile</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden pb-16">
      {/* Header */}
      <div className="pt-4 pb-1 px-4 text-center border-b border-gray-700">
        <h1 className="text-lg font-bold">Profile</h1>
      </div>

      {/* Profile Content */}
      <div className="flex-1 flex flex-col items-center px-4 py-6">
        {error && (
          <div className="w-full max-w-xs mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Profile Avatar & Name */}
        {user ? (
          <div className="mb-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-xl mb-3 mx-auto overflow-hidden">
              {user.picture ? (
                <img 
                  src={user.picture} 
                  alt={user.name || user.email}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold">
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <h2 className="text-base font-bold">{user.name || 'User'}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        ) : (
          <div className="mb-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-xl mb-3 mx-auto">
              👤
            </div>
            <h2 className="text-base font-bold">Not signed in</h2>
          </div>
        )}
        
        {/* Key Stats */}
        {user && (
          <div className="w-full max-w-xs flex justify-between mb-8">
            <div className="text-center px-4">
              <p className="text-2xl font-bold text-green-400">{userStats.streakDays}</p>
              <p className="text-xs text-gray-300">Day Streak</p>
            </div>
            
            <div className="text-center px-4">
              <p className="text-2xl font-bold text-green-400">{userStats.donationsSaved}</p>
              <p className="text-xs text-gray-300">Saved</p>
            </div>
          </div>
        )}
        
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
          
          {user ? (
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-3 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30 rounded-lg transition-colors duration-200"
            >
              <span className="text-lg mr-3">🚪</span>
              <span className="text-red-300">Sign Out</span>
            </button>
          ) : (
            <SettingsItem 
              icon="🔑" 
              label="Sign In" 
              onClick={() => window.location.href = '/onboarding/signup'}
            />
          )}
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
  onClick?: () => void;
}

function SettingsItem({ icon, label, onClick }: SettingsItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center px-4 py-3 bg-gray-800/30 hover:bg-gray-700/30 rounded-lg transition-colors duration-200"
    >
      <span className="text-lg mr-3">{icon}</span>
      <span className="text-gray-300">{label}</span>
    </button>
  );
}
