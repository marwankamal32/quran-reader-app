import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../styles/colors';

// Mock of Stripe Elements components
const CardElement = ({ onChange }: { onChange: (event: any) => void }) => {
  return (
    <div 
      className="w-full h-10 bg-indigo-800/50 border border-indigo-600 rounded-lg flex items-center px-4 text-white text-sm"
      onClick={() => onChange({ complete: true })}
    >
      •••• •••• •••• 4242
    </div>
  );
};

export default function PaymentMethod() {
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCardChange = (event: any) => {
    setIsComplete(event.complete);
    setError(event.error ? event.error.message : null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!isComplete) {
      setError('Please enter valid card details.');
      return;
    }
    
    setIsProcessing(true);
    
    // Mock Stripe payment method creation
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would:
      // 1. Create a payment method with Stripe.js
      // 2. Send the payment method ID to your server
      // 3. Store in your database securely
      
      // Navigate to home on success
      navigate('/home');
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-indigo-800 text-white">
      {/* Progress indicator */}
      <div className="w-full px-6 pt-6">
        <div className="w-full bg-indigo-700/30 h-1.5 rounded-full">
          <div 
            className="h-full bg-amber-400 rounded-full"
            style={{ width: '75%' }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-indigo-300 mt-1">
          <span>Step 3 of 4</span>
          <span>Payment Setup</span>
        </div>
      </div>

      {/* Header */}
      <div className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-xl font-bold mb-2">Add Payment Method</h1>
        <p className="text-sm text-indigo-200">
          Your card will only be charged if you miss your daily reading
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 py-4">
        <div className="w-full max-w-xs">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                className="block text-sm font-medium mb-2 text-indigo-200"
                htmlFor="card-element"
              >
                Card Details
              </label>
              
              <div id="card-element" className="mb-2">
                <CardElement onChange={handleCardChange} />
              </div>
              
              {error && (
                <p className="text-xs text-red-400 mt-1">
                  {error}
                </p>
              )}
            </div>

            

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={!isComplete || isProcessing}
              className={`w-full py-3 rounded-lg transition-colors text-white font-medium mb-3 ${
                isComplete && !isProcessing
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : 'bg-amber-500/50 cursor-not-allowed'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Complete Setup'}
            </button>
          </form>
          
          <button 
            onClick={() => navigate('/onboarding/signup')}
            disabled={isProcessing}
            className="w-full py-3 rounded-lg bg-transparent border border-indigo-600 hover:bg-indigo-800/30 transition-colors text-white font-medium"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
} 