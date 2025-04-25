
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Comment } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Clock, MessageSquare, User, Edit, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { deleteComment } from "@/services/api";
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
import CommentForm from "./CommentForm";

interface CommentsListProps {
  comments: Comment[];
  postId: number;
  onCommentUpdated: () => void;
}

const CommentsList = ({ comments, postId, onCommentUpdated }: CommentsListProps) => {
  const [commentToEdit, setCommentToEdit] = useState<Comment | undefined>(undefined);
  const [commentToDelete, setCommentToDelete] = useState<Comment | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;
    
    try {
      setIsDeleting(true);
      await deleteComment(commentToDelete.id);
      
      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted successfully",
      });
      
      onCommentUpdated();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setCommentToDelete(undefined);
    }
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg">
        <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-2" />
        <h3 className="text-lg font-medium mb-1">No comments yet</h3>
        <p className="text-gray-600">Be the first to share your thoughts!</p>
      </div>
    );
  }
  
  // If we're editing a comment, render the comment form for that comment
  if (commentToEdit) {
    return (
      <div className="space-y-4">
        {comments.map((comment) => (
          comment.id === commentToEdit.id ? (
            <Card key={comment.id}>
              <CardContent className="pt-6">
                <CommentForm
                  postId={postId}
                  commentToEdit={commentToEdit}
                  onCommentAdded={() => {
                    onCommentUpdated();
                    setCommentToEdit(undefined);
                  }}
                  onCancelEdit={() => setCommentToEdit(undefined)}
                />
              </CardContent>
            </Card>
          ) : (
            <CommentItem
              key={comment.id}
              comment={comment}
              onEdit={() => setCommentToEdit(comment)}
              onDelete={() => setCommentToDelete(comment)}
            />
          )
        ))}
      </div>
    );
  }
  
  return (
    <>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onEdit={() => setCommentToEdit(comment)}
            onDelete={() => setCommentToDelete(comment)}
          />
        ))}
      </div>
      
      <AlertDialog open={!!commentToDelete} onOpenChange={(isOpen) => !isOpen && setCommentToDelete(undefined)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteComment}
              className="bg-red-500 hover:bg-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

interface CommentItemProps {
  comment: Comment;
  onEdit: () => void;
  onDelete: () => void;
}

const CommentItem = ({ comment, onEdit, onDelete }: CommentItemProps) => {
  return (
    <Card>
      <CardHeader className="py-3 px-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.id}`} />
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="font-medium text-sm">Community Member</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDistanceToNow(new Date(comment.date), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-3 px-4">
        <p className="text-sm">{comment.comment}</p>
      </CardContent>
      <CardFooter className="py-2 px-4 flex justify-end">
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CommentsList;
