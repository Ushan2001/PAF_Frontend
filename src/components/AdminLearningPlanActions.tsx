
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LearningPlan } from "@/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteLearningPlan } from "@/services/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AdminLearningPlanForm from "./AdminLearningPlanForm";

interface AdminLearningPlanActionsProps {
  plan: LearningPlan;
  onSuccess: () => void;
}

const AdminLearningPlanActions = ({ plan, onSuccess }: AdminLearningPlanActionsProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteLearningPlan(plan.id);
      toast({
        title: "Success",
        description: "Learning plan deleted successfully",
      });
      onSuccess();
    } catch (error) {
      console.error("Error deleting learning plan:", error);
      toast({
        title: "Error",
        description: "Failed to delete learning plan",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <AdminLearningPlanForm 
        plan={plan} 
        onSuccess={onSuccess} 
        mode="edit" 
      />
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsDeleteDialogOpen(true)}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the learning plan "{plan.title}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminLearningPlanActions;
