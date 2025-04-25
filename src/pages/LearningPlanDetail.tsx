
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLearningPlanById } from "@/services/api";
import { LearningPlan } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, CheckCircle, Download, FileText, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LearningFeatures from "@/components/LearningFeatures";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import AdminLearningPlanActions from "@/components/AdminLearningPlanActions";
import { useNavigate } from "react-router-dom";

const LearningPlanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<LearningPlan | null>(null);
  const [loading, setLoading] = useState(true);
  // TODO: In a real app, this would be determined by user role from authentication
  const [isAdmin] = useState(true);
  const navigate = useNavigate();
  
  const fetchPlan = async () => {
    try {
      if (id) {
        const planData = await getLearningPlanById(parseInt(id));
        setPlan(planData);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching learning plan:", error);
      setLoading(false);
      // For demo, provide mock data if API fails
      if (id) {
        setPlan({
          id: parseInt(id),
          title: "Web Development Fundamentals",
          description: "Learn the core concepts of web development including HTML, CSS and JavaScript. This comprehensive plan takes you from the very basics to advanced concepts, with practical exercises at every step.\n\nThe plan is structured to gradually build your skills, starting with HTML markup, moving to CSS styling, and finally to interactive JavaScript functionality. Each module includes theory, examples, and hands-on projects.",
          imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          pdfUrl: "https://example.com/webdev-fundamentals.pdf"
        });
      }
    }
  };
  
  useEffect(() => {
    fetchPlan();
  }, [id]);
  
  const handlePlanDeleted = () => {
    navigate("/learning-plans");
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingPlaceholder type="post" />
      </div>
    );
  }
  
  if (!plan) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Learning Plan not found</h1>
        <p>The learning plan you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{plan.title}</h1>
          
          {isAdmin && (
            <AdminLearningPlanActions 
              plan={plan} 
              onSuccess={handlePlanDeleted} 
            />
          )}
        </div>
        
        <div className="mb-8 flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=mentor" />
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Learning Plan Creator</div>
            <div className="text-sm text-muted-foreground">Expert Mentor</div>
          </div>
          <div className="ml-auto">
            <Button variant="outline" size="sm">Follow</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="rounded-xl overflow-hidden mb-6">
              <img
                src={plan.imageUrl}
                alt={plan.title}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">About this Learning Plan</h2>
              <p className="text-gray-700 whitespace-pre-line">{plan.description}</p>
              
              <LearningFeatures />
            </div>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-medium">Learning Plan Details</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                      <span>12 modules</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      <span>PDF Resources</span>
                    </div>
                  </div>
                  
                  <Button className="w-full gradient-bg">Start Learning</Button>
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <Download className="mr-2 h-4 w-4" />
                    Download Plan
                  </Button>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Plan Includes:</h4>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">Complete roadmap to master skills</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">Recommended resources and practice exercises</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">Progress tracking tools</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span className="text-sm">Community support</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPlanDetail;
