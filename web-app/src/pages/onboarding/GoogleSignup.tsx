import { useNavigate } from 'react-router-dom';
import { colors } from '../../styles/colors';

export default function GoogleSignup() {
  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    // In a real implementation, this would trigger Google OAuth
    // For now, we'll just simulate successful authentication
    setTimeout(() => {
      navigate('/onboarding/payment');
    }, 1000);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-indigo-800 text-white">
      {/* Progress indicator */}
      <div className="w-full px-6 pt-6">
        <div className="w-full bg-indigo-700/30 h-1.5 rounded-full">
          <div 
            className="h-full bg-amber-400 rounded-full"
            style={{ width: '50%' }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-indigo-300 mt-1">
          <span>Step 2 of 4</span>
          <span>Account Setup</span>
        </div>
      </div>

      {/* Header */}
      <div className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-xl font-bold mb-2">Sign in to Continue</h1>
        <p className="text-sm text-indigo-200">
          Create an account or sign in to track your progress
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-xs">
          <button 
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-gray-100 transition-colors text-gray-800 font-medium rounded-lg mb-6"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Continue with Google
          </button>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6">
        <button 
          onClick={() => navigate('/onboarding/donation')}
          className="w-full py-3 rounded-lg bg-transparent border border-indigo-600 hover:bg-indigo-800/30 transition-colors text-white font-medium"
        >
          Back
        </button>
      </div>
    </div>
  );
} 