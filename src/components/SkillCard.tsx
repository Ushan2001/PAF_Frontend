
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Post } from "@/types";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface SkillCardProps {
  post: Post;
}

const SkillCard = ({ post }: SkillCardProps) => {
  return (
    <Link to={`/post/${post.id}`}>
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow group">
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{post.title}</h3>
            <div className="flex items-center text-yellow-500">
              <Star className="fill-yellow-500 h-4 w-4" />
              <span className="ml-1 text-sm">4.8</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground text-sm line-clamp-2">{post.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <span>3 comments</span>
            <span>•</span>
            <span>Beginner friendly</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SkillCard;
