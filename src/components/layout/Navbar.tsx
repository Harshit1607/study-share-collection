
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Upload, 
  Search, 
  User, 
  Menu, 
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchCurrentUser } from "@/utils/api";
import { User as UserType } from "@/types";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-full transition-all duration-200",
          isActive
            ? "text-primary-foreground bg-primary"
            : "text-foreground/80 hover:text-foreground hover:bg-accent"
        )}
      >
        {children}
      </Link>
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 transition-transform hover:scale-105"
        >
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">StudyShare</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/notes">Notes</NavLink>
          <NavLink to="/upload">Upload</NavLink>
        </nav>

        {/* Desktop Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
            <Button
              variant="secondary"
              size="sm"
              className="relative rounded-full"
              asChild
            >
              <Link to="/upload">
                <Upload className="h-4 w-4 mr-2" /> Upload Notes
              </Link>
            </Button>
          </div>

          {currentUser ? (
            <Button
              variant="ghost"
              size="sm"
              className="relative rounded-full flex items-center gap-2"
              asChild
            >
              <Link to="/profile">
                <User className="h-4 w-4" />
                <span>{currentUser.name.split(" ")[0]}</span>
              </Link>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="relative rounded-full"
              asChild
            >
              <Link to="/login">Sign in</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 bg-background/95 backdrop-blur-md transition-all duration-300 ease-in-out border-b",
          isMenuOpen ? "top-16 opacity-100" : "-top-full opacity-0"
        )}
      >
        <nav className="container py-6 flex flex-col space-y-4">
          <Link
            to="/"
            className="flex items-center py-2 border-b border-border/50 text-foreground"
          >
            Home
          </Link>
          <Link
            to="/notes"
            className="flex items-center py-2 border-b border-border/50 text-foreground"
          >
            Browse Notes
          </Link>
          <Link
            to="/upload"
            className="flex items-center py-2 border-b border-border/50 text-foreground"
          >
            Upload Notes
          </Link>
          
          {currentUser ? (
            <Link
              to="/profile"
              className="flex items-center py-2 text-foreground"
            >
              <User className="h-4 w-4 mr-2" />
              My Profile
            </Link>
          ) : (
            <div className="flex flex-col space-y-2 pt-2">
              <Button asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/signup">Create account</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
