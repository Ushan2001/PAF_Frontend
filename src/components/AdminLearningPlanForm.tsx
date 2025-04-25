
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LearningPlan } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createLearningPlan, updateLearningPlan } from "@/services/api";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit } from "lucide-react";

interface AdminLearningPlanFormProps {
  plan?: LearningPlan;
  onSuccess: () => void;
  mode: "create" | "edit";
}

const AdminLearningPlanForm = ({ plan, onSuccess, mode }: AdminLearningPlanFormProps) => {
  const [title, setTitle] = useState(plan?.title || "");
  const [description, setDescription] = useState(plan?.description || "");
  const [imageUrl, setImageUrl] = useState(plan?.imageUrl || "");
  const [pdfUrl, setPdfUrl] = useState(plan?.pdfUrl || "");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !imageUrl || !pdfUrl) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      if (mode === "create") {
        await createLearningPlan({
          title,
          description,
          imageUrl,
          pdfUrl
        });
        toast({
          title: "Success",
          description: "Learning plan created successfully",
        });
      } else {
        await updateLearningPlan({
          id: plan!.id,
          title,
          description,
          imageUrl,
          pdfUrl
        });
        toast({
          title: "Success",
          description: "Learning plan updated successfully",
        });
      }
      
      setIsOpen(false);
      onSuccess();
      
      // Reset form if creating
      if (mode === "create") {
        setTitle("");
        setDescription("");
        setImageUrl("");
        setPdfUrl("");
      }
    } catch (error) {
      console.error("Error saving learning plan:", error);
      toast({
        title: "Error",
        description: `Failed to ${mode === "create" ? "create" : "update"} learning plan`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={mode === "create" ? "default" : "outline"} size={mode === "create" ? "default" : "sm"}>
          {mode === "create" ? <><Plus className="mr-2" /> Add Learning Plan</> : <Edit className="h-4 w-4" />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create" : "Edit"} Learning Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter learning plan title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter detailed description"
              rows={5}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdfUrl">PDF URL</Label>
            <Input
              id="pdfUrl"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              placeholder="Enter PDF URL"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : mode === "create" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLearningPlanForm;
