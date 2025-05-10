import { Post } from "@/types";
import { API_URL } from "./config";

const getCommonHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export const getPosts = async (): Promise<Post[]> => {
  console.log("Fetching all posts from:", `${API_URL}/posts`);
  try {
    const response = await fetch(`${API_URL}/posts`, {
      credentials: "include",
      headers: getCommonHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }

      const errorData = await response.json().catch(() => ({}));
      console.error("Get all posts error:", errorData);
      throw new Error(
        `Failed to fetch posts: ${response.status}${
          errorData.message ? ` - ${errorData.message}` : ""
        }`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostById = async (id: number): Promise<Post> => {
  console.log("Fetching post with id:", id);
  try {
    const response = await fetch(`${API_URL}/post/${id}`, {
      credentials: "include",
      headers: getCommonHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }

      const errorData = await response.json().catch(() => ({}));
      console.error("Get post by id error:", errorData);
      throw new Error(
        `Failed to fetch post: ${response.status}${
          errorData.message ? ` - ${errorData.message}` : ""
        }`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  console.log("Creating post:", post);
  try {
    const response = await fetch(`${API_URL}/post`, {
      method: "POST",
      credentials: "include",
      headers: getCommonHeaders(),
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }

      const errorData = await response.json().catch(() => ({}));
      console.error("Create post error:", errorData);
      throw new Error(
        `Failed to create post: ${response.status}${
          errorData.message ? ` - ${errorData.message}` : ""
        }`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Post submission error:", error);
    throw error;
  }
};

export const updatePost = async (post: Post): Promise<Post> => {
  console.log("Updating post:", post);
  try {
    const response = await fetch(`${API_URL}/post`, {
      method: "PUT",
      credentials: "include",
      headers: getCommonHeaders(),
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }

      const errorData = await response.json().catch(() => ({}));
      console.error("Update post error:", errorData);
      throw new Error(
        `Failed to update post: ${response.status}${
          errorData.message ? ` - ${errorData.message}` : ""
        }`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  console.log("Deleting post with id:", id);
  try {
    const response = await fetch(`${API_URL}/post/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: getCommonHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }

      const errorData = await response.json().catch(() => ({}));
      console.error("Delete post error:", errorData);
      throw new Error(
        `Failed to delete post: ${response.status}${
          errorData.message ? ` - ${errorData.message}` : ""
        }`
      );
    }

    await response.text();
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
