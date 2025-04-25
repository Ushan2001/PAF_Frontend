
import Hero from "@/components/Hero";
import FeaturedSkills from "@/components/FeaturedSkills";
import FeaturedLearningPlans from "@/components/FeaturedLearningPlans";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedSkills />
      
      {/* How it works section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How SkillSwap Works</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our platform makes it easy to share your knowledge and learn from others
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-skill-100 flex items-center justify-center mb-4">
                <Users className="text-skill-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Join a community of learners and experts who share your interests
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-swap-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-swap-600">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m7 9 5 3.5L17 9"></path>
                  <path d="m7 15 5-3.5 5 3.5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share</h3>
              <p className="text-gray-600">
                Create posts to teach others what you're passionate about
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-skill-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="text-skill-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Master</h3>
              <p className="text-gray-600">
                Follow learning plans to systematically build your skills
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedLearningPlans />
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-skill-600 to-swap-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Skills?</h2>
          <p className="text-white/90 max-w-xl mx-auto mb-8">
            Join our growing community of learners and educators today. Start sharing your knowledge or acquire new skills.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-skill-600 hover:bg-white/90">
            Join SkillSwap
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
