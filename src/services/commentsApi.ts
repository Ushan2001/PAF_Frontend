import { Comment } from "@/types";
import { API_URL } from "./config";

const getCommonHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export const getCommentsByPostId = async (
  postId: number
): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}/comments/post/${postId}`, {
    credentials: "include",
    headers: getCommonHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch comments: ${response.status}`);
  }

  return response.json();
};

export const createComment = async (
  comment: Omit<Comment, "id" | "date">
): Promise<Comment> => {
  const response = await fetch(`${API_URL}/comment`, {
    method: "POST",
    credentials: "include",
    headers: getCommonHeaders(),
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error(`Failed to create comment: ${response.status}`);
  }

  return response.json();
};

export const updateComment = async (
  comment: Omit<Comment, "date"> & { date: string }
): Promise<Comment> => {
  const response = await fetch(`${API_URL}/comment`, {
    method: "PUT",
    credentials: "include",
    headers: getCommonHeaders(),
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error(`Failed to update comment: ${response.status}`);
  }

  return response.json();
};

export const deleteComment = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/comment/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: getCommonHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to delete comment: ${response.status}`);
  }
};
