
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { LearningPlan } from "@/types";
import { BookOpen, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface LearningPlanCardProps {
  plan: LearningPlan;
}

const LearningPlanCard = ({ plan }: LearningPlanCardProps) => {
  return (
    <Link to={`/learning-plan/${plan.id}`}>
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow group">
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={plan.imageUrl} 
            alt={plan.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2">
            <BookOpen className="h-4 w-4" />
          </div>
        </div>
        <CardHeader className="p-4">
          <h3 className="font-semibold text-lg">{plan.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground text-sm line-clamp-2">{plan.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            <span>Complete learning roadmap</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default LearningPlanCard;
