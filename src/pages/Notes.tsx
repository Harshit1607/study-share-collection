
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Note, Subject } from "@/types";
import { fetchNotes, fetchSubjects } from "@/utils/api";
import NoteCard from "@/components/ui/NoteCard";
import SubjectBadge from "@/components/ui/SubjectBadge";
import { BookOpen, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Notes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState<Note[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [selectedSubject, setSelectedSubject] = useState(
    searchParams.get("subject") || ""
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort") || "recent"
  );
  
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [allNotes, allSubjects] = await Promise.all([
          fetchNotes(),
          fetchSubjects(),
        ]);
        
        setNotes(allNotes);
        setSubjects(allSubjects);
      } catch (error) {
        console.error("Failed to load notes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...notes];
    
    // Filter by subject
    if (selectedSubject) {
      result = result.filter(
        (note) => note.subject.code === selectedSubject
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (note) =>
          note.name.toLowerCase().includes(query) ||
          note.subject.name.toLowerCase().includes(query) ||
          note.user.name.toLowerCase().includes(query)
      );
    }
    
    // Sort
    switch (sortBy) {
      case "recent":
        result.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime());
        break;
      case "oldest":
        result.sort((a, b) => a.uploadDate.getTime() - b.uploadDate.getTime());
        break;
      case "rating":
        result.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case "comments":
        result.sort((a, b) => b.commentCount - a.commentCount);
        break;
    }
    
    setFilteredNotes(result);
    
    // Update URL search params
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (selectedSubject) params.set("subject", selectedSubject);
    if (sortBy) params.set("sort", sortBy);
    setSearchParams(params, { replace: true });
  }, [notes, searchQuery, selectedSubject, sortBy, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already applied via the useEffect
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSubject("");
    setSortBy("recent");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-32">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Browse Notes
              </h1>
              <p className="text-muted-foreground mt-1">
                Find study materials shared by fellow students
              </p>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div
              className={`lg:sticky top-24 space-y-6 ${
                showFilters ? "block" : "hidden md:block"
              }`}
            >
              <div className="bg-card rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </h3>
                  
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="search"
                        className="text-sm text-muted-foreground"
                      >
                        Search
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          placeholder="Search notes..."
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm text-muted-foreground"
                      >
                        Subject
                      </label>
                      <Select
                        value={selectedSubject}
                        onValueChange={setSelectedSubject}
                      >
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="All Subjects" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Subjects</SelectItem>
                          {subjects.map((subject) => (
                            <SelectItem
                              key={subject.code}
                              value={subject.code}
                            >
                              {subject.code} - {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label
                        htmlFor="sort"
                        className="text-sm text-muted-foreground"
                      >
                        Sort by
                      </label>
                      <Select
                        value={sortBy}
                        onValueChange={setSortBy}
                      >
                        <SelectTrigger id="sort">
                          <SelectValue placeholder="Most Recent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="comments">Most Comments</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(searchQuery || selectedSubject || sortBy !== "recent") && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-full text-muted-foreground mt-2"
                        onClick={clearFilters}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear filters
                      </Button>
                    )}
                  </form>
                </div>
              </div>
              
              <div className="bg-card rounded-xl border p-6">
                <h3 className="font-medium mb-4 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Subject Tags
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject.code}
                      onClick={() => setSelectedSubject(subject.code)}
                      className="inline-block"
                    >
                      <SubjectBadge
                        subject={subject}
                        className={
                          selectedSubject === subject.code
                            ? "ring-2 ring-primary ring-offset-2"
                            : ""
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div 
                      key={index}
                      className="bg-muted animate-pulse h-64 rounded-xl"
                    />
                  ))}
                </div>
              ) : filteredNotes.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-muted-foreground">
                      Found {filteredNotes.length} notes
                      {selectedSubject && (
                        <>
                          {" "}in{" "}
                          <span className="font-medium text-foreground">
                            {subjects.find((s) => s.code === selectedSubject)?.name}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredNotes.map((note, index) => (
                      <NoteCard key={note.id} note={note} index={index} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16 space-y-4">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium">No notes found</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    We couldn't find any notes matching your search criteria. Try adjusting your filters.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Notes;
