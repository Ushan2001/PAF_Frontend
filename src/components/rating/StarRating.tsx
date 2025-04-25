
import RatingStar from "./RatingStar";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onChange?: (rating: number) => void;
  onHover?: (rating: number) => void;
  onMouseLeave?: () => void;
  hoveredRating?: number;
  size?: number;
  interactive?: boolean;
}

const StarRating = ({
  rating,
  maxRating = 5,
  onChange,
  onHover,
  onMouseLeave,
  hoveredRating = 0,
  size = 5,
  interactive = true,
}: StarRatingProps) => {
  const displayRating = hoveredRating || rating;

  return (
    <div className="flex">
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1;
        return (
          <RatingStar
            key={starValue}
            filled={starValue <= displayRating}
            size={size}
            onClick={interactive ? () => onChange?.(starValue) : undefined}
            onMouseEnter={interactive ? () => onHover?.(starValue) : undefined}
            onMouseLeave={interactive ? onMouseLeave : undefined}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
