
import { useState, useEffect } from "react";
import { Rating } from "@/types";
import { createRating, getAllRatings, updateRating, deleteRating } from "@/services/ratingsApi";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AverageRating from "./rating/AverageRating";
import RatingForm from "./rating/RatingForm";
import RatingsTable from "./rating/RatingsTable";
import DeleteRatingDialog from "./rating/DeleteRatingDialog";

interface RatingComponentProps {
  postId: number;
}

const RatingComponent = ({ postId }: RatingComponentProps) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [filteredRatings, setFilteredRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ratingToDelete, setRatingToDelete] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchRatings = async () => {
    try {
      const allRatings = await getAllRatings();
      setRatings(allRatings);
      
      // Filter ratings for current post
      const currentPostRatings = allRatings.filter(rating => rating.postid === postId);
      setFilteredRatings(currentPostRatings);
      
      if (currentPostRatings.length > 0) {
        const sum = currentPostRatings.reduce((acc, curr) => acc + curr.level, 0);
        setAverageRating(sum / currentPostRatings.length);
      } else {
        setAverageRating(null);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [postId]);

  const handleRatingSubmit = async () => {
    if (userRating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      await createRating({
        postid: postId,
        level: userRating,
      });
      
      toast({
        title: "Success",
        description: "Your rating has been submitted",
      });
      
      setUserRating(0);
      fetchRatings();
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError("Failed to submit your rating. Please try again.");
      toast({
        title: "Error",
        description: "Failed to submit your rating. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditRating = async (ratingId: number, level: number) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const ratingToUpdate = {
        id: ratingId,
        postid: postId,
        level: level,
      };
      
      await updateRating(ratingToUpdate);
      
      toast({
        title: "Success",
        description: "Rating has been updated",
      });
      
      fetchRatings();
    } catch (error) {
      console.error("Error updating rating:", error);
      setError("Failed to update rating. Please try again.");
      toast({
        title: "Error",
        description: "Failed to update rating. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setRatingToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!ratingToDelete) return;

    try {
      await deleteRating(ratingToDelete);
      
      toast({
        title: "Success",
        description: "Rating has been deleted",
      });
      
      setDeleteDialogOpen(false);
      setRatingToDelete(null);
      fetchRatings();
    } catch (error) {
      console.error("Error deleting rating:", error);
      toast({
        title: "Error",
        description: "Failed to delete rating. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCancel = () => {
    setRatingToDelete(null);
    setDeleteDialogOpen(false);
  };

  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Rate this post</h3>
      
      {averageRating !== null && (
        <AverageRating 
          averageRating={averageRating} 
          totalRatings={filteredRatings.length} 
        />
      )}
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <RatingForm
        userRating={userRating}
        setUserRating={setUserRating}
        onSubmit={handleRatingSubmit}
        isSubmitting={isSubmitting}
      />
      
      <RatingsTable
        ratings={filteredRatings}
        postId={postId}
        onEdit={handleEditRating}
        onDelete={handleDeleteClick}
      />

      <DeleteRatingDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default RatingComponent;
