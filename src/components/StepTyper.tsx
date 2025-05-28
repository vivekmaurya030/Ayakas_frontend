import React, { useEffect, useState } from "react";

const steps = [
  "1. Wash and cut the bitter gourd into 2-inch cylinders.",
  "2. Scoop out the seeds to hollow them.",
  "3. Soak in salt water to reduce bitterness.",
  "4. Roast kalonji, methi, cashew, and almonds.",
  "5. Blend the mixture into a coarse paste.",
  "6. Sauté onion, garlic, ginger, chilies and add the nut paste.",
  "7. Stuff this into the karela and pan-fry lightly.",
  "8. Add curd gently, coat and simmer.",
  "9. Serve hot with lachha paratha and palak raita!"
];

const StepTyper = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [displayedSteps, setDisplayedSteps] = useState<string[]>([]);

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      const fullText = steps[currentStepIndex];
      let charIndex = 0;

      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, charIndex + 1));
        charIndex++;

        if (charIndex === fullText.length) {
          clearInterval(interval);
          setTimeout(() => {
            setDisplayedSteps((prev) => [...prev, fullText]);
            setTypedText("");
            setCurrentStepIndex((prev) => prev + 1);
          }, 1000); // Pause after each step
        }
      }, 50); // Typing speed (ms per character)

      return () => clearInterval(interval);
    }
  }, [currentStepIndex]);

  return (
    <div className="p-6 font-mono text-lg max-w-2xl mx-auto">
      {displayedSteps.map((step, index) => (
        <p key={index} className="mb-2 text-gray-800">{step}</p>
      ))}
      {typedText && <p className="text-blue-600">{typedText}_</p>}
      {currentStepIndex === steps.length && (
        <p className="text-green-600 font-bold mt-4">🎉 All steps completed!</p>
      )}
    </div>
  );
};

export default StepTyper;
