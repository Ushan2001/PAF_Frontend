import { Post } from "@/types";
import { API_URL } from "./config";

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }
  
  return response.json();
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await fetch(`${API_URL}/post/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`);
  }
  
  return response.json();
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch(`${API_URL}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create post: ${response.status}`);
  }
  
  return response.json();
};

export const updatePost = async (post: Post): Promise<Post> => {
  const response = await fetch(`${API_URL}/post`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update post: ${response.status}`);
  }
  
  return response.json();
};

export const deletePost = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/post/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete post: ${response.status}`);
  }
};
