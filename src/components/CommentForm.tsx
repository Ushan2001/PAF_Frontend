
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createComment, updateComment } from "@/services/api";
import { Comment } from "@/types";

interface CommentFormProps {
  postId: number;
  onCommentAdded: (comment: Comment) => void;
  commentToEdit?: Comment;
  onCancelEdit?: () => void;
}

const CommentForm = ({ 
  postId, 
  onCommentAdded, 
  commentToEdit, 
  onCancelEdit 
}: CommentFormProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Set comment text if editing
  useEffect(() => {
    if (commentToEdit) {
      setNewComment(commentToEdit.comment);
    } else {
      setNewComment("");
    }
  }, [commentToEdit]);
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    try {
      setIsSubmitting(true);
      
      let comment;
      
      if (commentToEdit) {
        // Update existing comment
        comment = await updateComment({
          id: commentToEdit.id,
          postId,
          comment: newComment,
          date: commentToEdit.date
        });
        
        toast({
          title: "Comment updated",
          description: "Your comment has been updated successfully",
        });
        
        if (onCancelEdit) {
          onCancelEdit();
        }
      } else {
        // Create new comment
        comment = await createComment({
          postId,
          comment: newComment
        });
        
        toast({
          title: "Comment added",
          description: "Your comment has been posted successfully",
        });
      }
      
      onCommentAdded(comment);
      setNewComment("");
    } catch (error) {
      console.error("Error saving comment:", error);
      toast({
        title: "Error",
        description: `Failed to ${commentToEdit ? "update" : "post"} your comment. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="mt-6">
      <h3 className="font-medium mb-2">{commentToEdit ? "Edit comment" : "Add a comment"}</h3>
      <form onSubmit={handleSubmitComment}>
        <Textarea
          placeholder="Share your thoughts or ask a question about this skill..."
          className="mb-4"
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex space-x-2">
          <Button type="submit" disabled={!newComment.trim() || isSubmitting}>
            {isSubmitting ? "Saving..." : commentToEdit ? "Update Comment" : "Post Comment"}
          </Button>
          
          {commentToEdit && onCancelEdit && (
            <Button type="button" variant="outline" onClick={onCancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
