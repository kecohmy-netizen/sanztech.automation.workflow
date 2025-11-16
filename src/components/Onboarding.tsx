import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
  action?: string;
}

const steps: OnboardingStep[] = [
  {
    title: "Welcome to Maya! 🎉",
    description: "Your AI-powered automation platform for TikTok, link bio management, and workflow automation.",
    icon: "🤖",
  },
  {
    title: "Create Workflows ⚙️",
    description: "Build visual workflows with drag-and-drop. Automate your TikTok posts, link bio updates, and more!",
    icon: "🔄",
    action: "Go to Workflows",
  },
  {
    title: "Chat with Maya 💬",
    description: "Get help anytime! Maya can check your stats, manage workflows, and give you insights.",
    icon: "🤖",
    action: "Open Maya Chat",
  },
  {
    title: "Track Performance 📊",
    description: "Monitor your views, clicks, conversions, and revenue in real-time with beautiful analytics.",
    icon: "📈",
    action: "View Dashboard",
  },
  {
    title: "You're All Set! 🚀",
    description: "Start automating your business and let Maya handle the rest. Need help? Just ask Maya!",
    icon: "✨",
  },
];

export function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? "w-8 bg-yellow-500"
                    : index < currentStep
                    ? "w-2 bg-yellow-500/50"
                    : "w-2 bg-gray-700"
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{step.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-3">{step.title}</h2>
            <p className="text-lg text-gray-300 max-w-lg mx-auto">{step.description}</p>
          </div>

          {/* Action button (if available) */}
          {step.action && (
            <div className="flex justify-center mb-6">
              <button className="px-6 py-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 rounded-lg hover:bg-yellow-500/30 transition-colors">
                {step.action}
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </button>

            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Skip Tour
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Get Started
                  <Check className="h-5 w-5" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
