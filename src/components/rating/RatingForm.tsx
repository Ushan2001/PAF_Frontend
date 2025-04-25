
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";

interface RatingFormProps {
  userRating: number;
  setUserRating: (rating: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const RatingForm = ({ 
  userRating, 
  setUserRating,
  onSubmit, 
  isSubmitting 
}: RatingFormProps) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <span className="mr-2">Your rating:</span>
        <StarRating
          rating={userRating}
          onChange={setUserRating}
          onHover={setHoveredRating}
          onMouseLeave={() => setHoveredRating(0)}
          hoveredRating={hoveredRating}
          size={6}
        />
      </div>
      <Button
        onClick={onSubmit}
        disabled={isSubmitting || userRating === 0}
        className="mt-2"
      >
        {isSubmitting ? "Submitting..." : "Submit Rating"}
      </Button>
    </div>
  );
};

export default RatingForm;
