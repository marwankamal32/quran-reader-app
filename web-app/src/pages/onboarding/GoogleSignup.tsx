import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../styles/colors';
import AuthService from '../../services/auth';

export default function GoogleSignup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Initiate Google OAuth flow
      AuthService.initiateGoogleLogin();
      
    } catch (error) {
      console.error('Google signup failed:', error);
      setError('Failed to initiate Google login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteOnboarding = () => {
    // Check if user is authenticated
    if (AuthService.isAuthenticated()) {
      // Mark onboarding as completed and navigate to home
      localStorage.setItem('onboardingCompleted', 'true');
      navigate('/home');
    } else {
      setError('Please sign in first to complete onboarding.');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Progress indicator */}
      <div className="w-full px-6 pt-6">
        <div className="w-full bg-gray-700/30 h-1.5 rounded-full">
          <div 
            className="h-full bg-green-400 rounded-full"
            style={{ width: '75%' }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-300 mt-1">
          <span>Step 3 of 4</span>
          <span>Account Setup</span>
        </div>
      </div>

      {/* Header */}
      <div className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-xl font-bold mb-2">Sign in to Continue</h1>
        <p className="text-sm text-gray-300">
          We'll use your account to track your reading progress and handle donations
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-4 mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-xs">
          
          {/* Google Sign-in Button */}
          <button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className={`
              w-full flex items-center justify-center px-4 py-3 mb-6
              bg-white text-gray-900 rounded-lg font-medium
              transition-all duration-200
              ${isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-100 hover:shadow-lg active:scale-95'
              }
            `}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Auth Status */}
          {AuthService.isAuthenticated() && (
            <div className="mb-6 p-3 bg-green-900/30 border border-green-500/30 rounded-lg">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span className="text-sm text-green-300">
                  Successfully signed in as {AuthService.getUser()?.name || AuthService.getUser()?.email}
                </span>
              </div>
            </div>
          )}

          {/* Privacy Note */}
          <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <span className="mr-2">🔒</span>
              Your Privacy Matters
            </h3>
            <p className="text-xs text-gray-300">
              We only access your basic profile information (name, email, profile picture) to personalize your experience. We never access your personal data.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-3">
        {AuthService.isAuthenticated() ? (
          <button
            onClick={handleCompleteOnboarding}
            style={{ backgroundColor: colors.primary }}
            className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          >
            Continue to App
          </button>
        ) : (
          <button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            style={{ backgroundColor: colors.primary }}
            className={`
              w-full py-3 px-4 rounded-lg font-medium text-white
              transition-all duration-200
              ${isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:opacity-90 active:scale-95'
              }
            `}
          >
            {isLoading ? 'Please wait...' : 'Sign in to Continue'}
          </button>
        )}
        
        <button
          onClick={() => navigate('/onboarding/donation')}
          className="w-full py-3 px-4 rounded-lg font-medium text-gray-300 border border-gray-600 transition-all duration-200 hover:bg-gray-700/30 active:scale-95"
        >
          Back
        </button>
      </div>
    </div>
  );
} 