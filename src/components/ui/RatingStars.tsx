
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars = ({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
}: RatingStarsProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "h-3 w-3";
      case "md":
        return "h-4 w-4";
      case "lg":
        return "h-5 w-5";
      default:
        return "h-4 w-4";
    }
  };

  const handleRatingChange = (newRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((starPosition) => {
        const isActive = starPosition <= (hoverRating || rating);
        
        return (
          <button
            key={starPosition}
            type="button"
            className={cn(
              "focus:outline-none transition-transform",
              interactive ? "cursor-pointer hover:scale-110" : "cursor-default",
              isActive ? "text-yellow-400" : "text-gray-300"
            )}
            onClick={() => handleRatingChange(starPosition)}
            onMouseEnter={() => interactive && setHoverRating(starPosition)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
          >
            <Star className={cn("fill-current", getSizeClass())} />
          </button>
        );
      })}
      
      {interactive && (
        <span className="ml-2 text-xs text-muted-foreground">
          {hoverRating || rating || "Rate"}/5
        </span>
      )}
    </div>
  );
};

export default RatingStars;
