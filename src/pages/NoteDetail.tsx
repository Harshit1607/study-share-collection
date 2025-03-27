
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { NoteDetail as NoteDetailType, Comment, Rating } from "@/types";
import { addComment, addRating, fetchCurrentUser, fetchNote } from "@/utils/api";
import RatingStars from "@/components/ui/RatingStars";
import SubjectBadge from "@/components/ui/SubjectBadge";
import { 
  ArrowLeft, 
  Calendar, 
  Download, 
  File, 
  FileText,
  Loader2, 
  MessageSquare, 
  User 
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<NoteDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) return;
        
        const [noteData, currentUser] = await Promise.all([
          fetchNote(id),
          fetchCurrentUser(),
        ]);
        
        setNote(noteData);
        setIsLoggedIn(!!currentUser);
      } catch (error) {
        console.error("Failed to load note:", error);
        toast({
          title: "Error",
          description: "Failed to load the note. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [id, toast]);

  const handleRatingChange = async (value: number) => {
    if (!id || !isLoggedIn) return;
    
    setIsSubmittingRating(true);
    
    try {
      const newRating = await addRating(id, value);
      
      // Update the note with the new rating
      if (note) {
        const updatedRatings = [...note.ratings, newRating];
        const averageRating = 
          updatedRatings.reduce((sum, r) => sum + r.value, 0) / updatedRatings.length;
        
        setNote({
          ...note,
          ratings: updatedRatings,
          averageRating,
        });
      }
      
      toast({
        title: "Success",
        description: "Your rating has been submitted.",
      });
    } catch (error) {
      console.error("Failed to submit rating:", error);
      toast({
        title: "Error",
        description: "Failed to submit your rating. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || !commentText.trim() || !isLoggedIn) return;
    
    setIsSubmittingComment(true);
    
    try {
      const newComment = await addComment(id, commentText);
      
      // Update the note with the new comment
      if (note) {
        setNote({
          ...note,
          comments: [newComment, ...note.comments],
          commentCount: note.commentCount + 1,
        });
      }
      
      setCommentText("");
      
      toast({
        title: "Success",
        description: "Your comment has been posted.",
      });
    } catch (error) {
      console.error("Failed to post comment:", error);
      toast({
        title: "Error",
        description: "Failed to post your comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "Unknown size";
    
    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(2)} KB`;
    }
    
    const mb = kb / 1024;
    return `${mb.toFixed(2)} MB`;
  };

  const getFileIcon = () => {
    if (!note) return <File className="h-5 w-5" />;
    
    if (note.file.fileType.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else if (note.file.fileType.includes("word")) {
      return <FileText className="h-5 w-5 text-blue-500" />;
    } else if (note.file.fileType.includes("presentation")) {
      return <FileText className="h-5 w-5 text-orange-500" />;
    } else {
      return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-32">
          <div className="container max-w-4xl animate-pulse">
            <div className="h-8 bg-muted rounded mb-4 w-1/3" />
            <div className="h-6 bg-muted rounded mb-12 w-2/3" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className="h-32 bg-muted rounded" />
                <div className="h-48 bg-muted rounded" />
              </div>
              
              <div className="space-y-4">
                <div className="h-64 bg-muted rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-32">
          <div className="container max-w-4xl text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Note Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The note you are looking for does not exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/notes">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Notes
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-32">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <Link 
              to="/notes" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all notes
            </Link>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <SubjectBadge subject={note.subject} size="lg" />
              
              <span className="text-sm text-muted-foreground">
                {note.subject.year > 0 ? (
                  <>Year {note.subject.year}, Semester {note.subject.semester}</>
                ) : null}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight">{note.name}</h1>
            
            <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{note.user.name}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{format(note.uploadDate, "MMMM d, yyyy")}</span>
              </div>
              
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>
                  {note.commentCount} {note.commentCount === 1 ? "comment" : "comments"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Rating Section */}
              <div className="bg-card border rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4">Rating & Reviews</h2>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-3xl font-bold mr-2">
                        {note.averageRating.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground">/ 5</span>
                    </div>
                    
                    <RatingStars rating={note.averageRating} size="lg" />
                    
                    <p className="text-xs text-muted-foreground">
                      Based on {note.ratings.length} {note.ratings.length === 1 ? "rating" : "ratings"}
                    </p>
                  </div>
                  
                  <div className="border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-4">
                    {isLoggedIn ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Rate this note:</p>
                        <RatingStars 
                          rating={0} 
                          interactive 
                          onRatingChange={handleRatingChange}
                          size="lg"
                        />
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        <Link to="/login" className="text-primary hover:underline">
                          Sign in
                        </Link>{" "}
                        to rate this note
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="bg-card border rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4">Comments</h2>
                
                {isLoggedIn ? (
                  <form onSubmit={handleCommentSubmit} className="mb-8">
                    <Textarea
                      placeholder="Write your comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="mb-3 resize-none"
                      rows={3}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmittingComment || !commentText.trim()}
                    >
                      {isSubmittingComment ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        "Post Comment"
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-4 mb-6 text-center text-muted-foreground">
                    <p>
                      <Link to="/login" className="text-primary hover:underline">
                        Sign in
                      </Link>{" "}
                      to post a comment
                    </p>
                  </div>
                )}
                
                {note.comments.length > 0 ? (
                  <div className="space-y-6">
                    {note.comments.map((comment) => (
                      <div key={comment.id} className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                              {comment.user.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-medium">{comment.user.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {format(comment.date, "MMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm pl-10">{comment.text}</p>
                        
                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p className="mb-2">No comments yet</p>
                    <p className="text-sm">Be the first to comment on this note</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              {/* File Info & Download */}
              <div className="bg-card border rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-4">File Information</h2>
                
                <div className="space-y-4">
                  <div className="border border-border/50 rounded-lg p-4 flex gap-3">
                    {getFileIcon()}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{note.file.fileName}</h4>
                      {/* Size would come from the file in a real app */}
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(1.2 * 1024 * 1024)}
                      </p>
                    </div>
                  </div>
                  
                  <Button className="w-full" asChild>
                    <a href={note.file.downloadUrl} download={note.file.fileName}>
                      <Download className="mr-2 h-4 w-4" />
                      Download File
                    </a>
                  </Button>
                  
                  <div className="text-xs text-muted-foreground">
                    <p className="mb-2">
                      This file is shared for educational purposes only.
                    </p>
                    <p>
                      Please respect copyright and intellectual property rights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NoteDetail;
