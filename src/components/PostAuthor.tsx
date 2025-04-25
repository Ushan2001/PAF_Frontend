
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, User } from "lucide-react";

const PostAuthor = () => {
  return (
    <div className="mb-8 flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=skill" />
        <AvatarFallback><User /></AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">Skill Creator</div>
        <div className="text-sm text-muted-foreground">Joined 2 years ago</div>
      </div>
      <div className="ml-auto flex items-center">
        <div className="flex items-center text-yellow-500 mr-4">
          <Star className="fill-yellow-500 h-5 w-5 mr-1" />
          <span>4.8 (24 ratings)</span>
        </div>
        <Button variant="outline" size="sm">Follow</Button>
      </div>
    </div>
  );
};

export default PostAuthor;
