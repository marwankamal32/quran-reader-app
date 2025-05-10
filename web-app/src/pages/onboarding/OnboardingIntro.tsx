import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../styles/colors';

export default function OnboardingIntro() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const introSteps = [
    {
      title: "Welcome to Daily Quran",
      description: "Build a habit of regular Quran reading through commitment and accountability.",
      icon: "🕌"
    },
    {
      title: "Set a Daily Pledge",
      description: "Choose a small donation amount that will be given to charity if you miss your daily reading.",
      icon: "💰"
    },
    {
      title: "Track Your Progress",
      description: "Build a streak and see how much you've saved by maintaining your daily reading habit.",
      icon: "📈"
    }
  ];

  const handleNext = () => {
    if (currentStep < introSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/onboarding/donation');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-indigo-800 text-white">
      {/* Progress bar */}
      <div className="w-full px-6 pt-6">
        <div className="w-full bg-indigo-700/30 h-1.5 rounded-full">
          <div 
            className="h-full bg-amber-400 rounded-full transition-all duration-300"
            style={{ 
              width: `${(currentStep + 1) / introSteps.length * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-indigo-300 mt-1">
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
          
          <p className="text-center text-indigo-200 mb-8">
            {introSteps[currentStep].description}
          </p>
        </div>
      </div>

      {/* Bottom action */}
      <div className="p-6">
        <button 
          onClick={handleNext}
          className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 transition-colors text-white font-medium"
        >
          {currentStep < introSteps.length - 1 ? "Next" : "Get Started"}
        </button>
      </div>
    </div>
  );
} 