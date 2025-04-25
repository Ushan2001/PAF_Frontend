
import { useEffect, useState } from "react";
import { LearningPlan } from "@/types";
import { getLearningPlans } from "@/services/api";
import LearningPlanCard from "@/components/LearningPlanCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import AdminLearningPlanForm from "@/components/AdminLearningPlanForm";

const LearningPlans = () => {
  const [plans, setPlans] = useState<LearningPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<LearningPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // TODO: In a real app, this would be determined by user role from authentication
  const [isAdmin] = useState(true);
  
  const fetchPlans = async () => {
    try {
      const data = await getLearningPlans();
      setPlans(data);
      setFilteredPlans(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching learning plans:", error);
      setLoading(false);
      // If API fails, provide some mock data for demo
      const mockPlans = [
        {
          id: 1,
          title: "Web Development Fundamentals",
          description: "Learn the core concepts of web development including HTML, CSS and JavaScript.",
          imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          pdfUrl: "https://example.com/webdev-fundamentals.pdf"
        },
        {
          id: 2,
          title: "Data Science Essentials",
          description: "Master data analysis, visualization and machine learning fundamentals.",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          pdfUrl: "https://example.com/datascience-essentials.pdf"
        },
        {
          id: 3,
          title: "UI/UX Design Principles",
          description: "Learn to create beautiful, functional user interfaces with modern design principles.",
          imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          pdfUrl: "https://example.com/uiux-design.pdf"
        }
      ];
      setPlans(mockPlans);
      setFilteredPlans(mockPlans);
    }
  };
  
  useEffect(() => {
    fetchPlans();
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = plans.filter(plan => 
        plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPlans(filtered);
    } else {
      setFilteredPlans(plans);
    }
  }, [searchTerm, plans]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingPlaceholder type="post" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Learning Plans</h1>
          
          {isAdmin && (
            <AdminLearningPlanForm mode="create" onSuccess={fetchPlans} />
          )}
        </div>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for learning plans..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {filteredPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="relative">
                <LearningPlanCard plan={plan} />
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <AdminLearningPlanForm 
                      plan={plan} 
                      onSuccess={fetchPlans} 
                      mode="edit" 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No learning plans found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPlans;
