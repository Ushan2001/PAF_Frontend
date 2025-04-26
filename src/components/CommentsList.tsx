import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Comment } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Clock, MessageSquare, User, Edit, Trash2, Heart } from "lucide-react";
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
      <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 shadow-sm">
        <MessageSquare className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" strokeWidth={1.5} />
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">No comments yet</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Be the first to share your thoughts on this topic!</p>
      </div>
    );
  }
  
  // If we're editing a comment, render the comment form for that comment
  if (commentToEdit) {
    return (
      <div className="space-y-6">
        {comments.map((comment) => (
          comment.id === commentToEdit.id ? (
            <Card key={comment.id} className="border-amber-200 dark:border-amber-800 shadow-md">
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
      <div className="space-y-6">
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
        <AlertDialogContent className="max-w-md border-red-200 dark:border-red-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Delete Comment
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this comment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteComment}
              className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
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
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 5)); // Random initial likes for demo
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <Card className="border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="py-4 px-5 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 ring-2 ring-offset-2 ring-blue-100 dark:ring-blue-900 dark:ring-offset-gray-900">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.id}`} />
            <AvatarFallback className="bg-blue-500 text-white"><User /></AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="font-semibold text-gray-800 dark:text-gray-200">Community Member</div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDistanceToNow(new Date(comment.date), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-5 px-5 text-gray-700 dark:text-gray-300">
        <p className="text-sm leading-relaxed whitespace-pre-line">{comment.comment}</p>
      </CardContent>
      <CardFooter className="py-3 px-5 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLike}
          className={`text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 ${liked ? 'text-red-500 dark:text-red-400' : ''}`}
        >
          <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-current' : ''}`} />
          {likeCount > 0 && <span>{likeCount}</span>}
        </Button>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onEdit}
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDelete}
            className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CommentsList;