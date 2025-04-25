
import { useState, useEffect } from "react";
import { getPosts } from "@/services/api";
import { Post } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import AdminPostForm from "@/components/AdminPostForm";
import AdminPostActions from "@/components/AdminPostActions";

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to load posts. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const handlePostUpdated = () => {
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingPlaceholder type="postManagement" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Manage Posts</h1>
        <AdminPostForm onSuccess={handlePostUpdated} mode="create" />
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <div className="divide-y">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/100?text=IMG";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {post.description}
                    </p>
                  </div>
                </div>
                <AdminPostActions post={post} onSuccess={handlePostUpdated} />
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">No posts found</p>
              <p className="text-sm text-gray-400 mt-2">
                {searchTerm
                  ? "Try changing your search term"
                  : "Create your first post by clicking the 'Add New Post' button"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;
