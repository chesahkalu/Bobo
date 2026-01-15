"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface OnboardingModalProps {
  userName: string;
}

const steps = [
  {
    title: "Welcome to Bobo! 🍃",
    description: "Your smart companion for tracking your baby's growth, feeding, sleep, and milestones.",
    icon: "👋",
    content: "We're so happy to have you here! Let's take a quick tour of what Bobo can do for you.",
  },
  {
    title: "Add Your Baby 👶",
    description: "Start by creating a profile for your little one.",
    icon: "👶",
    content: "Add your baby's name, birthdate, and photo. You can add multiple babies if you have more than one!",
    action: { label: "Add Baby", href: "/dashboard/babies/new" },
  },
  {
    title: "Track Daily Activities 📊",
    description: "Log sleep, feeding, and diaper changes with just a tap.",
    icon: "📊",
    content: "Quick logging buttons make it easy to track everything. See patterns emerge over time with beautiful charts.",
  },
  {
    title: "Explore Features ✨",
    description: "Discover AI insights, activities, nutrition guides, and more.",
    icon: "✨",
    content: "Use our AI assistant for parenting advice, find age-appropriate activities, track growth milestones, and connect with other parents.",
    features: [
      { icon: "🤖", label: "AI Assistant" },
      { icon: "🎮", label: "Activities" },
      { icon: "📏", label: "Growth Charts" },
      { icon: "🥗", label: "Nutrition" },
    ],
  },
  {
    title: "You're All Set! 🎉",
    description: "Start your parenting journey with Bobo.",
    icon: "🚀",
    content: "That's it! You're ready to start tracking. Remember, you can always access Settings to customize your experience.",
  },
];

export default function OnboardingModal({ userName }: OnboardingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("bobo-onboarding-complete");
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem("bobo-onboarding-complete", "true");
    setIsOpen(false);
  };

  const handleSkip = () => {
    localStorage.setItem("bobo-onboarding-complete", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  if (!step) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-gray-100 dark:bg-gray-700">
          <div
            className="h-full bg-[#425a51] transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="p-8">
          {/* Step indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep
                    ? "bg-[#425a51]"
                    : index < currentStep
                    ? "bg-[#425a51]/50"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{step.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentStep === 0 ? `${step.title.replace("!", `, ${userName.split(" ")[0]}!`)}` : step.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-300">{step.content}</p>
          </div>

          {/* Features grid */}
          {step.features && (
            <div className="grid grid-cols-4 gap-3 mb-6">
              {step.features.map((feature, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#f4f6f5] dark:bg-gray-700 rounded-xl text-center"
                >
                  <div className="text-2xl mb-1">{feature.icon}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">{feature.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Action button */}
          {step.action && (
            <Link
              href={step.action.href}
              onClick={handleComplete}
              className="block w-full py-3 mb-4 rounded-xl bg-[#f4f6f5] dark:bg-gray-700 text-center text-[#425a51] dark:text-[#6b9c8c] font-medium hover:bg-[#e8edea] dark:hover:bg-gray-600 transition-colors"
            >
              {step.action.label} →
            </Link>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-4">
            {currentStep > 0 ? (
              <button
                onClick={handlePrevious}
                className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                ← Back
              </button>
            ) : (
              <button
                onClick={handleSkip}
                className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-600 font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Skip Tour
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-xl bg-[#425a51] text-white font-medium hover:bg-[#364842] transition-colors"
            >
              {currentStep === steps.length - 1 ? "Get Started!" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
