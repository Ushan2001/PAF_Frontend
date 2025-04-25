
import { useEffect, useState } from "react";
import { Post } from "@/types";
import { getPosts } from "@/services/api";
import SkillCard from "./SkillCard";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const FeaturedSkills = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.slice(0, 3)); // Show just 3 featured skills
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load skills. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Skills</h2>
          <div className="text-red-500 mb-4">{error}</div>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Skills</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover popular skills shared by our community members
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <SkillCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p>No skills found. Be the first to share a skill!</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            <Link to="/posts">View All Skills</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSkills;
