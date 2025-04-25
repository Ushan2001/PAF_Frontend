
import { useState } from "react";
import { Rating } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import StarRating from "./StarRating";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface RatingsTableProps {
  ratings: Rating[];
  postId: number;
  onEdit: (ratingId: number, level: number) => void;
  onDelete: (ratingId: number) => void;
}

const RatingsTable = ({ 
  ratings, 
  postId,
  onEdit,
  onDelete
}: RatingsTableProps) => {
  const [editingRatingId, setEditingRatingId] = useState<number | null>(null);
  const [editingRatingLevel, setEditingRatingLevel] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleEditClick = (rating: Rating) => {
    setEditingRatingId(rating.id);
    setEditingRatingLevel(rating.level);
  };

  const handleEditCancel = () => {
    setEditingRatingId(null);
    setEditingRatingLevel(0);
  };

  const handleEditSubmit = () => {
    if (!editingRatingId || editingRatingLevel === 0) return;
    onEdit(editingRatingId, editingRatingLevel);
    setEditingRatingId(null);
    setEditingRatingLevel(0);
  };

  return (
    <div className="mt-6">
      <h4 className="text-md font-semibold mb-2">All Ratings for this Post</h4>
      <Table>
        <TableCaption>List of ratings for post #{postId}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Rating ID</TableHead>
            <TableHead>Post ID</TableHead>
            <TableHead>Rating Level</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ratings.length > 0 ? (
            ratings.map((rating) => (
              <TableRow key={rating.id}>
                <TableCell>{rating.id}</TableCell>
                <TableCell>{rating.postid}</TableCell>
                <TableCell>
                  {editingRatingId === rating.id ? (
                    <StarRating
                      rating={editingRatingLevel}
                      onChange={setEditingRatingLevel}
                      onHover={setHoveredRating}
                      onMouseLeave={() => setHoveredRating(0)}
                      hoveredRating={hoveredRating}
                      size={5}
                    />
                  ) : (
                    <StarRating
                      rating={rating.level}
                      interactive={false}
                      size={4}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {editingRatingId === rating.id ? (
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={handleEditSubmit}
                        disabled={editingRatingLevel === 0}
                      >
                        Save
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleEditClick(rating)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-700" 
                        onClick={() => onDelete(rating.id as number)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">No ratings yet</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RatingsTable;
