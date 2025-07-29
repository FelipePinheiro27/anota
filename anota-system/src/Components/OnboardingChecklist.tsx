import React from "react";
import OnboardingContainer from "./onboarding/OnboardingContainer";

interface OnboardingChecklistProps {
  onComplete?: () => void;
}

const OnboardingChecklist = ({ onComplete }: OnboardingChecklistProps) => {
  return <OnboardingContainer onComplete={onComplete} />;
};

export default OnboardingChecklist; 