import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../styles/colors';

// Mock of Stripe Elements components
const CardElement = ({ onChange }: { onChange: (event: any) => void }) => {
  return (
    <div 
      className="w-full h-10 bg-gray-800/50 border border-gray-600 rounded-lg flex items-center px-4 text-white text-sm"
      onClick={() => onChange({ complete: true })}
    >
      •••• •••• •••• 4242
    </div>
  );
};

export default function PaymentMethod() {
  const navigate = useNavigate();
  const [cardValid, setCardValid] = useState(false);

  const handleCardChange = (event: any) => {
    setCardValid(event.complete);
  };

  const handleContinue = () => {
    if (cardValid) {
      // Mark onboarding as completed and navigate to home
      localStorage.setItem('onboardingCompleted', 'true');
      navigate('/home');
    }
  };

  const handleSkip = () => {
    // For demo purposes, allow skipping payment setup
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/home');
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
          <span>Payment Setup</span>
        </div>
      </div>

      {/* Header */}
      <div className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-xl font-bold mb-2">Add Payment Method</h1>
        <p className="text-sm text-gray-300">
          Your card will only be charged if you miss your daily reading
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6">
        <div className="w-full max-w-xs">
          <div className="mb-6">
            <label 
              className="block text-sm font-medium mb-2 text-gray-300"
              htmlFor="card"
            >
              Card Information
            </label>
            <CardElement onChange={handleCardChange} />
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <span className="mr-2">🔒</span>
              Secure & Protected
            </h3>
            <p className="text-xs text-gray-300">
              Your payment information is encrypted and secure. You'll only be charged if you miss your daily reading commitment.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 space-y-3">
        <button 
          onClick={handleContinue}
          disabled={!cardValid}
          className={`w-full py-3 rounded-lg transition-colors text-white font-medium mb-3 ${
            cardValid 
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-green-500/50 cursor-not-allowed'
          }`}
        >
          Complete Setup
        </button>
        
        <button 
          onClick={handleSkip}
          className="w-full py-2 text-sm text-green-400 underline"
        >
          Skip for now (Demo only)
        </button>
        
        <button 
          onClick={() => navigate('/onboarding/signup')}
          className="w-full py-3 rounded-lg bg-transparent border border-gray-600 hover:bg-gray-800/30 transition-colors text-white font-medium"
        >
          Back
        </button>
      </div>
    </div>
  );
} 