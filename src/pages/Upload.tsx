
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import FileUpload from "@/components/ui/FileUpload";
import { Subject } from "@/types";
import { fetchCurrentUser, fetchSubjects, uploadNote } from "@/utils/api";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Upload = () => {
  const [name, setName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await fetchCurrentUser();
        
        if (!user) {
          toast({
            title: "Authentication required",
            description: "You need to sign in to upload notes",
            variant: "destructive",
          });
          
          setIsRedirecting(true);
          navigate("/login");
          return;
        }
        
        setIsLoggedIn(true);
        
        const allSubjects = await fetchSubjects();
        setSubjects(allSubjects);
      } catch (error) {
        console.error("Failed to check authentication:", error);
        toast({
          title: "Error",
          description: "Failed to load. Please try again later.",
          variant: "destructive",
        });
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !subjectCode || !file) {
      toast({
        title: "Error",
        description: "Please fill out all fields and select a file",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await uploadNote(name, subjectCode, file);
      
      toast({
        title: "Success",
        description: "Your note has been uploaded successfully",
      });
      
      navigate(`/notes/${result.id}`);
    } catch (error: any) {
      console.error("Failed to upload note:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isRedirecting) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
            <p>Redirecting to login...</p>
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
        <div className="container max-w-3xl">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>
          
          <div className="bg-card border rounded-xl p-8">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Share Your Notes
              </h1>
              <p className="text-muted-foreground">
                Help fellow students by sharing your study materials
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Note Title</Label>
                <Input
                  id="name"
                  placeholder="Enter a descriptive title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Add a clear title to help others find your notes
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={subjectCode}
                  onValueChange={setSubjectCode}
                  required
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select the subject for these notes" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.code} value={subject.code}>
                        {subject.code} - {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>File</Label>
                <FileUpload onFileChange={setFile} />
                <p className="text-xs text-muted-foreground">
                  Allowed file types: PDF, Word, PowerPoint (Max: 10MB)
                </p>
              </div>
              
              <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-4 border border-border/50">
                <p className="font-medium mb-1">Important Notes:</p>
                <ul className="space-y-1 pl-5 list-disc">
                  <li>Please only upload content you have the right to share</li>
                  <li>Make sure your notes do not violate copyright laws</li>
                  <li>Avoid sharing sensitive or personal information</li>
                </ul>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Note"
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;
