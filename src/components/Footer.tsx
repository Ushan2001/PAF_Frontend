
import { Link } from "react-router-dom";
import { BookOpen, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-skill-500 to-swap-500 rounded-lg p-2">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div className="text-xl font-bold">
                <span className="text-skill-600">Skill</span>
                <span className="text-swap-600">Swap</span>
              </div>
            </Link>
            <p className="text-gray-600">
              Connect, learn, and grow with a community of skill enthusiasts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-skill-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-skill-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-skill-600">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/posts" className="text-gray-600 hover:text-skill-600">
                  Browse Skills
                </Link>
              </li>
              <li>
                <Link to="/learning-plans" className="text-gray-600 hover:text-skill-600">
                  Learning Plans
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-skill-600">
                  Popular Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-skill-600">
                  Featured Creators
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-skill-600">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-skill-600">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-skill-600">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-skill-600">
                  Forum
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-skill-600">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-skill-600">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-skill-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-skill-600">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
