
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types";
import { createPost, updatePost } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AdminPostFormProps {
  post?: Post;
  onSuccess: () => void;
  mode: "create" | "edit";
}

const AdminPostForm = ({ post, onSuccess, mode }: AdminPostFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Omit<Post, 'id'>>({
    title: post?.title || "",
    description: post?.description || "",
    imageUrl: post?.imageUrl || "",
  });
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      if (mode === "create") {
        await createPost(formData);
        toast({
          title: "Success",
          description: "Post created successfully",
        });
      } else if (mode === "edit" && post) {
        await updatePost({ ...formData, id: post.id });
        toast({
          title: "Success",
          description: "Post updated successfully",
        });
      }
      
      onSuccess();
      setIsOpen(false);
    } catch (error) {
      console.error(`Error ${mode === "create" ? "creating" : "updating"} post:`, error);
      toast({
        title: "Error",
        description: `Failed to ${mode === "create" ? "create" : "update"} post`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={mode === "create" ? "default" : "outline"} 
          size={mode === "create" ? "default" : "sm"}
        >
          {mode === "create" ? (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add New Post
            </>
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Post" : "Edit Post"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Fill in the details to create a new post." 
              : "Update the post information below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter post description"
                required
                rows={5}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
              />
              {formData.imageUrl && (
                <div className="mt-2 rounded overflow-hidden max-h-32">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400?text=Image+Preview";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting 
                ? (mode === "create" ? "Creating..." : "Updating...") 
                : (mode === "create" ? "Create Post" : "Update Post")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPostForm;
