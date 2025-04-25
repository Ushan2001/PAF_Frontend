
import { Star } from "lucide-react";

interface RatingStarProps {
  filled: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  size?: number;
  className?: string;
}

const RatingStar = ({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  size = 5,
  className = "",
}: RatingStarProps) => {
  return (
    <Star
      className={`h-${size} w-${size} ${
        filled ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default RatingStar;
