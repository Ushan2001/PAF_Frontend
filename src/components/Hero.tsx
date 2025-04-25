
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-white to-skill-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Share Skills, <span className="gradient-text">Grow Together</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              Connect with a community of learners and experts to exchange knowledge, teach what you love, and master new skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-bg">
                <Link to="/posts" className="flex items-center">
                  Explore Skills <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link to="/learning-plans">Browse Learning Plans</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-swap-200 rounded-full blur-2xl opacity-70"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-skill-200 rounded-full blur-2xl opacity-70"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="People learning together" 
                className="rounded-xl shadow-lg w-full object-cover max-h-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
