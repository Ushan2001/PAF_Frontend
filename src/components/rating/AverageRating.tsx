
import StarRating from "./StarRating";

interface AverageRatingProps {
  averageRating: number;
  totalRatings: number;
}

const AverageRating = ({ averageRating, totalRatings }: AverageRatingProps) => {
  if (averageRating === null) return null;
  
  return (
    <div className="mb-4 flex items-center">
      <span className="mr-2">Average rating:</span>
      <div className="flex items-center">
        <StarRating 
          rating={Math.round(averageRating)} 
          interactive={false} 
        />
        <span className="ml-2 text-sm">
          ({averageRating.toFixed(1)}) from {totalRatings} {totalRatings === 1 ? "user" : "users"}
        </span>
      </div>
    </div>
  );
};

export default AverageRating;
