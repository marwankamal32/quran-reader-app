import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }

        if (!code) {
          throw new Error('No authorization code received from Google');
        }

        // Handle the OAuth callback
        await AuthService.handleOAuthCallback(code, state || undefined);
        
        setStatus('success');
        
        // Check if onboarding is completed
        const onboardingCompleted = localStorage.getItem('onboardingCompleted');
        
        // Redirect after a brief success message
        setTimeout(() => {
          if (onboardingCompleted === 'true') {
            navigate('/home');
          } else {
            navigate('/onboarding/payment');
          }
        }, 2000);

      } catch (error) {
        console.error('OAuth callback failed:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
        setStatus('error');
        
        // Redirect to signup page after showing error
        setTimeout(() => {
          navigate('/onboarding/signup');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-xs text-center">
          
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-6"></div>
              <h1 className="text-xl font-bold mb-2">Signing you in...</h1>
              <p className="text-sm text-gray-300">
                Please wait while we complete your authentication
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-xl font-bold mb-2">Successfully signed in!</h1>
              <p className="text-sm text-gray-300">
                Redirecting you to the app...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-xl font-bold mb-2">Sign in failed</h1>
              <p className="text-sm text-gray-300 mb-4">
                {error || 'An unexpected error occurred during sign in'}
              </p>
              <p className="text-xs text-gray-400">
                Redirecting you back to sign in...
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
} 