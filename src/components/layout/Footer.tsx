
import { Link } from "react-router-dom";
import { BookOpen, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t mt-auto">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold tracking-tight">StudyShare</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A platform for students to share study notes and materials, helping everyone succeed together.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/notes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Notes
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-muted-foreground hover:text-foreground transition-colors">
                  Upload Notes
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Copyright Information
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between mt-10 pt-6 border-t text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} StudyShare. All rights reserved.</p>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
