import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingIntro() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const introSteps = [
    {
      icon: '📖',
      title: 'Daily Quran Reading',
      description: 'Build a consistent habit of reading the Quran every day with gentle accountability'
    },
    {
      icon: '💰',
      title: 'Accountability Through Giving',
      description: 'Set a daily amount that gets donated to charity if you miss your reading'
    },
    {
      icon: '📱',
      title: 'Simple Voice Recording',
      description: 'Just record yourself reading for 1 minute to complete your daily goal'
    },
    {
      icon: '🎯',
      title: 'Track Your Progress',
      description: 'See your reading streak and celebrate your spiritual growth journey'
    }
  ];

  const handleNext = () => {
    if (currentStep < introSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/onboarding/donation');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Progress bar */}
      <div className="w-full px-6 pt-6">
        <div className="w-full bg-gray-700/30 h-1.5 rounded-full">
          <div 
            className="h-full bg-green-400 rounded-full transition-all duration-300"
            style={{ 
              width: `${(currentStep + 1) / introSteps.length * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-300 mt-1">
          <span>Intro</span>
          <span>{currentStep + 1}/{introSteps.length}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
        <div className="animate-fade-in transition-all duration-300">
          <div className="text-4xl mb-6 flex justify-center">
            {introSteps[currentStep].icon}
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-4">
            {introSteps[currentStep].title}
          </h1>
          
          <p className="text-center text-gray-300 mb-8">
            {introSteps[currentStep].description}
          </p>
        </div>
      </div>

      {/* Bottom action */}
      <div className="p-6">
        <button 
          onClick={handleNext}
          className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 transition-colors text-white font-medium"
        >
          {currentStep < introSteps.length - 1 ? "Next" : "Get Started"}
        </button>
      </div>
    </div>
  );
} 