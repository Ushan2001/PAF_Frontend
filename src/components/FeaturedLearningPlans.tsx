
import { useEffect, useState } from "react";
import { LearningPlan } from "@/types";
import { getLearningPlans } from "@/services/api";
import LearningPlanCard from "./LearningPlanCard";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const FeaturedLearningPlans = () => {
  const [plans, setPlans] = useState<LearningPlan[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getLearningPlans();
        setPlans(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching learning plans:", error);
        setLoading(false);
      }
    };
    
    fetchPlans();
  }, []);
  
  if (loading) {
    return (
      <section className="py-12 bg-skill-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-12 bg-skill-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Structured Learning Plans</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Follow expertly designed learning paths to master new skills efficiently
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <LearningPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            <Link to="/learning-plans">Browse All Plans</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLearningPlans;
