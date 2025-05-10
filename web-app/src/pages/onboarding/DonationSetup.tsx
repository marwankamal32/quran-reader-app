import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../styles/colors';

export default function DonationSetup() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>('5');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    
    // Validate input (must be a number between 5 and 100)
    const numValue = parseFloat(value);
    setIsValid(!isNaN(numValue) && numValue >= 5 && numValue <= 100);
  };

  const handleContinue = () => {
    if (isValid && amount) {
      // In a real app, you would save this to context/state management
      navigate('/onboarding/signup');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-indigo-800 text-white">
      {/* Progress indicator */}
      <div className="w-full px-6 pt-6">
        <div className="w-full bg-indigo-700/30 h-1.5 rounded-full">
          <div 
            className="h-full bg-amber-400 rounded-full"
            style={{ width: '25%' }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-indigo-300 mt-1">
          <span>Step 1 of 4</span>
          <span>Donation Setup</span>
        </div>
      </div>

      {/* Header */}
      <div className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-xl font-bold mb-2">Set Your Daily Commitment</h1>
        <p className="text-sm text-indigo-200">
          If you miss your daily Quran reading, this amount will be donated to charity
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6">
        <div className="w-full max-w-xs">
          <div className="mb-8">
            <label 
              className="block text-sm font-medium mb-2 text-indigo-200"
              htmlFor="amount"
            >
              Daily Amount 
            </label>
            
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                id="amount"
                type="number"
                min="5"
                max="100"
                value={amount}
                onChange={handleAmountChange}
                className={`w-full pl-8 pr-3 py-3 bg-indigo-800/50 border ${
                  isValid ? 'border-indigo-600' : 'border-red-500'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-white`}
              />
            </div>
            
            {!isValid && (
              <p className="mt-1 text-xs text-red-400">
                Please enter an amount between $5 and $100
              </p>
            )}
          </div>

          <div className="bg-indigo-700/30 rounded-lg p-4 mb-8">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <span className="mr-2">💡</span>
              Recommended Amount
            </h3>
            <p className="text-xs text-indigo-200">
              Most users set $5-$10 daily. This creates enough incentive to maintain your reading habit while being reasonable for your budget.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 space-y-3">
        <button 
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full py-3 rounded-lg transition-colors text-white font-medium ${
            isValid ? 'bg-amber-500 hover:bg-amber-600' : 'bg-amber-500/50 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
        
        <button 
          onClick={() => navigate('/onboarding')}
          className="w-full py-3 rounded-lg bg-transparent border border-indigo-600 hover:bg-indigo-800/30 transition-colors text-white font-medium"
        >
          Back
        </button>
      </div>
    </div>
  );
} 