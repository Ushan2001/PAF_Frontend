
import React from "react";

interface LoadingPlaceholderProps {
  type?: "post" | "comments" | "learningPlans" | "postManagement";
}

const LoadingPlaceholder = ({ type = "post" }: LoadingPlaceholderProps) => {
  if (type === "post") {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  if (type === "comments") {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  if (type === "learningPlans") {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-200 rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (type === "postManagement") {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return null;
};

export default LoadingPlaceholder;
