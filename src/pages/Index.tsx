import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import FeaturedSkills from "@/components/FeaturedSkills";
import FeaturedLearningPlans from "@/components/FeaturedLearningPlans";


interface UserDTO {
  name: string;
  email: string;
  imageUrl: string;
}

const fetchUser = async (): Promise<UserDTO> => {
  const response = await fetch("/api/dashboard", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

const Index = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !user) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error?.message || "Please log in to access your dashboard"}
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="text-skill-600"
          >
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* User Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user.name}
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Existing Dashboard Content */}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-swap-600"
                  >
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
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-skill-600 hover:bg-white/90"
              onClick={() => navigate("/posts")}
            >
              Explore Posts
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;