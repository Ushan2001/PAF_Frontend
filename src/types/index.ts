
export interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Comment {
  id: number;
  postId: number;
  comment: string;
  date: string;
}

export interface Rating {
  id?: number;
  postid: number;
  level: number;
}

export interface LearningPlan {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  pdfUrl: string;
}
