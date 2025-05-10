
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, User } from "lucide-react";

const Navbar = () => {

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/logout";
  };

  return (
    <header className="border-b shadow-sm sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-skill-500 to-swap-500 rounded-lg p-2">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div className="text-2xl font-bold">
            <span className="text-skill-600">Skill</span>
            <span className="text-swap-600">Swap</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="font-medium hover:text-skill-600 transition-colors">
            Home
          </Link>
          <Link to="/posts" className="font-medium hover:text-skill-600 transition-colors">
            Skills
          </Link>
          <Link to="/learning-plans" className="font-medium hover:text-skill-600 transition-colors">
            Learning Plans
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button className="hidden md:flex"
            onClick={handleLogout}
          >
            <User className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <Button variant="outline" className="md:hidden">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
