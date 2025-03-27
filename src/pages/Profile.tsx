
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Note, User } from "@/types";
import { fetchCurrentUser, fetchNotes, logoutUser } from "@/utils/api";
import NoteCard from "@/components/ui/NoteCard";
import { 
  ArrowLeft, 
  FileText, 
  Loader2, 
  LogOut, 
  Star, 
  Upload, 
  User as UserIcon 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userNotes, setUserNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await fetchCurrentUser();
        
        if (!currentUser) {
          toast({
            title: "Authentication required",
            description: "You need to sign in to view your profile",
          });
          
          navigate("/login");
          return;
        }
        
        setUser(currentUser);
        
        // Get all notes and filter by user
        const allNotes = await fetchNotes();
        const filteredNotes = allNotes.filter(
          (note) => note.user.id === currentUser.id
        );
        
        setUserNotes(filteredNotes);
      } catch (error) {
        console.error("Failed to load user data:", error);
        toast({
          title: "Error",
          description: "Failed to load your profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      await logoutUser();
      
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
            <p>Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-32">
          <div className="container max-w-4xl text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
            <p className="text-muted-foreground mb-6">
              You need to sign in to view your profile.
            </p>
            <Button asChild>
              <Link to="/login">
                Sign In
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
              to="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>
          
          <div className="bg-card border rounded-xl p-8 mb-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-semibold">
                {user.name.charAt(0)}
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild>
                  <Link to="/upload">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Note
                  </Link>
                </Button>
                
                <Button variant="ghost" onClick={handleLogout} disabled={isLoggingOut}>
                  {isLoggingOut ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging out...
                    </>
                  ) : (
                    <>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="notes" className="space-y-6">
            <TabsList className="grid grid-cols-2 max-w-[400px]">
              <TabsTrigger value="notes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <FileText className="h-4 w-4 mr-2" />
                My Notes
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <UserIcon className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="notes" className="space-y-6">
              {userNotes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userNotes.map((note, index) => (
                    <NoteCard key={note.id} note={note} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card/50 rounded-xl border">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  
                  <h3 className="text-lg font-medium mb-2">No notes yet</h3>
                  
                  <p className="text-muted-foreground mb-6">
                    You haven't shared any notes yet. Upload your first note to help other students.
                  </p>
                  
                  <Button asChild>
                    <Link to="/upload">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload your first note
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="account" className="space-y-6">
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-lg font-medium mb-4">Account Information</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                    <p className="font-medium">June 2023</p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="text-sm font-medium">Manage Account</h3>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" disabled>
                      Edit Profile
                    </Button>
                    
                    <Button variant="outline" size="sm" disabled>
                      Change Password
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          Signing out...
                        </>
                      ) : (
                        "Sign out"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-lg font-medium mb-4">Account Statistics</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <FileText className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">{userNotes.length}</p>
                    <p className="text-sm text-muted-foreground">Notes Shared</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Star className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Total Ratings</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <FileText className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Downloads</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
