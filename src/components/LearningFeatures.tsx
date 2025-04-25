
import React from "react";

const LearningFeatures = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-8 mb-4">What You'll Learn</h2>
      <ul className="space-y-2">
        <li className="flex items-start">
          <div className="mr-2 mt-1">✓</div>
          <div>Fundamentals of the skill with practical examples</div>
        </li>
        <li className="flex items-start">
          <div className="mr-2 mt-1">✓</div>
          <div>How to apply the knowledge in real-world situations</div>
        </li>
        <li className="flex items-start">
          <div className="mr-2 mt-1">✓</div>
          <div>Advanced techniques to take your skills to the next level</div>
        </li>
        <li className="flex items-start">
          <div className="mr-2 mt-1">✓</div>
          <div>Common mistakes to avoid and troubleshooting tips</div>
        </li>
      </ul>
    </>
  );
};

export default LearningFeatures;
