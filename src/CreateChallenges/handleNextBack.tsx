import React, { useState } from 'react';
export const handleNext = () => {
    // Handle logic for moving to the next step
};

export const handleBack = () => {
    // Handle logic for going back to the previous step
};

const handleNextBack = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 3; 
    

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="create-challenges-container">
            <div className="navigation-buttons">
                <button onClick={handleBack}>Back</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default handleNextBack;
