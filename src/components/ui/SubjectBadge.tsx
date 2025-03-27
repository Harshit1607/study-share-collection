
import { Subject } from "@/types";
import { cn } from "@/lib/utils";

interface SubjectBadgeProps {
  subject: Subject;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SubjectBadge = ({ subject, className, size = "md" }: SubjectBadgeProps) => {
  // Create a color mapping based on the first character of the subject code
  const getSubjectColor = (code: string) => {
    const colorMap: Record<string, string> = {
      "C": "bg-blue-100 text-blue-800 border-blue-200",
      "M": "bg-green-100 text-green-800 border-green-200",
      "P": "bg-purple-100 text-purple-800 border-purple-200",
      "E": "bg-orange-100 text-orange-800 border-orange-200",
      "B": "bg-red-100 text-red-800 border-red-200",
      "H": "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    
    const firstChar = code.charAt(0);
    return colorMap[firstChar] || "bg-gray-100 text-gray-800 border-gray-200";
  };
  
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        getSubjectColor(subject.code),
        sizeClasses[size],
        className
      )}
    >
      {subject.code}
    </span>
  );
};

export default SubjectBadge;
