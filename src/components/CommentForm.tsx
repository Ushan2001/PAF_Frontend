import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createComment, updateComment } from "@/services/api";
import { Comment } from "@/types";
import { Send, Edit, X } from "lucide-react";

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
    <div className="mt-8 bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className={`text-lg font-semibold mb-3 flex items-center ${commentToEdit ? "text-amber-600 dark:text-amber-400" : "text-blue-600 dark:text-blue-400"}`}>
        {commentToEdit ? (
          <>
            <Edit className="w-5 h-5 mr-2" />
            Edit comment
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Add a comment
          </>
        )}
      </h3>
      
      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          placeholder="Share your thoughts or ask a question about this skill..."
          className="mb-4 w-full border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        
        <div className="flex flex-wrap gap-3">
          <Button 
            type="submit" 
            disabled={!newComment.trim() || isSubmitting}
            className={`flex items-center gap-2 px-4 py-2 ${
              commentToEdit 
                ? "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700" 
                : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            } text-white font-medium rounded-md transition-colors duration-200`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : commentToEdit ? (
              <>
                <Edit className="w-4 h-4" />
                <span>Update Comment</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Post Comment</span>
              </>
            )}
          </Button>
          
          {commentToEdit && onCancelEdit && (
            <Button 
              type="button" 
              variant="outline"
              onClick={onCancelEdit}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-md transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </Button>
          )}
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {newComment.length > 0 ? (
            <p className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full mr-1 bg-green-500"></span>
              {newComment.length} characters
            </p>
          ) : (
            <p className="italic">Write something to enable posting</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;