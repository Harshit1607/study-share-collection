
import { Link } from "react-router-dom";
import { Calendar, Download, User } from "lucide-react";
import { Note } from "@/types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import SubjectBadge from "./SubjectBadge";
import RatingStars from "./RatingStars";
import { useStaggeredFadeIn } from "@/utils/animations";

interface NoteCardProps {
  note: Note;
  index?: number;
}

const NoteCard = ({ note, index = 0 }: NoteCardProps) => {
  const animation = useStaggeredFadeIn(index);
  
  const getFileIcon = () => {
    if (note.file.fileType.includes("pdf")) {
      return "📄";
    } else if (note.file.fileType.includes("word")) {
      return "📝";
    } else if (note.file.fileType.includes("presentation")) {
      return "📊";
    } else {
      return "📁";
    }
  };

  return (
    <div 
      className={cn(
        "glass-card p-5 rounded-xl flex flex-col h-full relative overflow-hidden transform transition-all duration-300",
        animation
      )}
    >
      <div className="absolute top-0 right-0 p-3 text-3xl opacity-20 rotate-12">
        {getFileIcon()}
      </div>
      
      <div className="mb-3">
        <SubjectBadge subject={note.subject} />
      </div>
      
      <Link to={`/notes/${note.id}`} className="group">
        <h3 className="text-lg font-medium leading-tight mb-2 group-hover:text-primary transition-colors">
          {note.name}
        </h3>
      </Link>
      
      <div className="flex items-center text-xs text-muted-foreground mb-3">
        <Calendar className="h-3 w-3 mr-1" />
        <span>{format(note.uploadDate, "MMM d, yyyy")}</span>
      </div>
      
      <div className="flex items-center text-xs text-muted-foreground mb-4">
        <User className="h-3 w-3 mr-1" />
        <span>{note.user.name}</span>
      </div>
      
      <div className="mt-auto pt-3 border-t border-border/50">
        <div className="flex justify-between items-center">
          <RatingStars rating={note.averageRating} />
          
          <Link 
            to={`/notes/${note.id}`}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {note.commentCount} {note.commentCount === 1 ? "comment" : "comments"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
