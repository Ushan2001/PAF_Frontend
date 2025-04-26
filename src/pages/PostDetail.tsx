import AdminPostActions from "@/components/AdminPostActions";
import CommentForm from "@/components/CommentForm";
import CommentsList from "@/components/CommentsList";
import LearningFeatures from "@/components/LearningFeatures";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import PostAuthor from "@/components/PostAuthor";
import RatingComponent from "@/components/RatingComponent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getCommentsByPostId } from "@/services/commentsApi";
import { getPostById } from "@/services/postsApi";
import { Comment, Post } from "@/types";
import { Clock, Eye, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isAdmin] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if (id) {
        setLoading(true);
        setError(null);

        const postData = await getPostById(parseInt(id));
        setPost(postData);

        try {
          const commentsData = await getCommentsByPostId(parseInt(id));
          setComments(commentsData);
        } catch (commentError) {
          console.error("Error fetching comments:", commentError);
          setComments([]);
        }
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
      setError("Failed to load post data. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to load post data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handlePostDeleted = () => {
    navigate("/posts");
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments(prev => [newComment, ...prev]);
  };

  const handleCommentsUpdated = () => {
    if (id) {
      getCommentsByPostId(parseInt(id))
        .then(data => setComments(data))
        .catch(error => {
          console.error("Error refreshing comments:", error);
        });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingPlaceholder type="post" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="mb-4">{error}</p>
        <Button onClick={fetchData}>Try Again</Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p>The post you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header section with title and admin actions */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          {isAdmin && (
            <AdminPostActions
              post={post}
              onSuccess={handlePostDeleted}
            />
          )}
        </div>
        
        <PostAuthor />

        <div className="rounded-lg overflow-hidden my-8">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
              }}
            />
          )}
        </div>

        <div className="flex items-center space-x-6 mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>10 min read</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Eye className="h-4 w-4 mr-1" />
            <span>1.2k views</span>
          </div>
        </div>

        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 whitespace-pre-line">{post.description}</p>
        </div>

        <RatingComponent postId={post.id} />

        <div className="flex items-center space-x-2 my-8">
          <Button variant="outline" size="sm" className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Helpful
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <ThumbsDown className="h-4 w-4 mr-2" />
            Not Helpful
          </Button>
          <Button variant="outline" size="sm" className="flex items-center ml-auto">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        <Separator className="my-8" />

        <LearningFeatures />

        <Separator className="my-8" />

        <h2 className="text-2xl font-semibold mb-6">Comments ({comments.length})</h2>

        <CommentForm
          postId={post.id}
          onCommentAdded={handleCommentAdded}
        />

        <div className="mt-8">
          {comments.length > 0 ? (
            <CommentsList
              comments={comments}
              postId={post.id}
              onCommentUpdated={handleCommentsUpdated}
            />
          ) : (
            <p className="text-gray-500 text-center py-6">No comments yet. Be the first to leave a comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;