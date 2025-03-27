
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Search, Share2, Upload } from "lucide-react";
import { Note, Subject } from "@/types";
import { fetchNotes, fetchSubjects } from "@/utils/api";
import NoteCard from "@/components/ui/NoteCard";
import SubjectBadge from "@/components/ui/SubjectBadge";
import { cn } from "@/lib/utils";
import { useFadeIn } from "@/utils/animations";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const [featuredNotes, setFeaturedNotes] = useState<Note[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fadeIn = useFadeIn();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [allNotes, allSubjects] = await Promise.all([
          fetchNotes(),
          fetchSubjects(),
        ]);
        
        // Sort by highest rating for featured
        const sortedNotes = [...allNotes].sort(
          (a, b) => b.averageRating - a.averageRating
        );
        
        setFeaturedNotes(sortedNotes.slice(0, 6));
        setSubjects(allSubjects);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="container flex flex-col items-center text-center max-w-4xl">
          <div 
            className={cn(
              "transition-all duration-700 transform", 
              fadeIn
            )}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Study better with shared knowledge
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Upload and discover high-quality study notes from fellow students. Learn together and excel in your courses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/notes">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Notes
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link to="/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Share Your Notes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <p className="mt-4 text-muted-foreground">
              A simple way to share knowledge and help each other succeed
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-background rounded-xl p-6 shadow-subtle flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Find Notes</h3>
              <p className="text-muted-foreground">
                Browse through notes organized by subject, rating, or recent uploads to find exactly what you need.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-subtle flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Study Efficiently</h3>
              <p className="text-muted-foreground">
                Access detailed notes from top students, helping you understand complex topics more quickly.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-subtle flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Share Knowledge</h3>
              <p className="text-muted-foreground">
                Upload your own study materials to help others and get feedback from the community.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Notes Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Notes</h2>
              <p className="mt-2 text-muted-foreground">
                Discover our highest-rated study materials
              </p>
            </div>
            
            <Button variant="ghost" className="mt-4 md:mt-0" asChild>
              <Link to="/notes">
                View all notes <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div 
                  key={index}
                  className="bg-muted animate-pulse h-64 rounded-xl"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredNotes.map((note, index) => (
                <NoteCard key={note.id} note={note} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Browse by Subject Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Browse by Subject</h2>
            <p className="mt-4 text-muted-foreground">
              Find notes specific to your courses
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {subjects.map((subject, index) => (
              <Link 
                key={subject.code} 
                to={`/notes?subject=${subject.code}`}
                className="transition-all duration-200 hover:-translate-y-1"
              >
                <SubjectBadge 
                  subject={subject} 
                  size="lg"
                  className="py-2 px-4 font-semibold shadow-sm hover:shadow"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Ready to contribute?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Share your knowledge with fellow students. Upload your notes and help others succeed while building your profile.
            </p>
            <Button size="lg" className="rounded-full" asChild>
              <Link to="/upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload Your Notes
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
