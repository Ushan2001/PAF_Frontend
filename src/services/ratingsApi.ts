import { Rating } from "@/types";

const API_URL = "http://localhost:8080/api/v1";

const getCommonHeaders = () => {
  return {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };
};

export const getAllRatings = async (): Promise<Rating[]> => {
  console.log("Fetching all ratings from:", `${API_URL}/ratings`);
  try {
    const response = await fetch(`${API_URL}/ratings`, {
      credentials: "include",
      headers: getCommonHeaders(),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }
      
      const errorData = await response.json().catch(() => ({}));
      console.error("Get all ratings error:", errorData);
      throw new Error(`Failed to fetch all ratings: ${response.status}${errorData.message ? ` - ${errorData.message}` : ''}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching ratings:", error);
    throw error;
  }
};

export const getRatingsByPostId = async (postId: number): Promise<Rating[]> => {
  console.log("Fetching ratings for postId:", postId);
  try {
    const response = await fetch(`${API_URL}/ratings/post/${postId}`, {
      credentials: "include",
      headers: getCommonHeaders(),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }
      
      const errorData = await response.json().catch(() => ({}));
      console.error("Get ratings by postId error:", errorData);
      throw new Error(`Failed to fetch ratings: ${response.status}${errorData.message ? ` - ${errorData.message}` : ''}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching ratings by post ID:", error);
    throw error;
  }
};

export const getRatingById = async (id: number): Promise<Rating> => {
  console.log("Fetching rating with id:", id);
  try {
    const response = await fetch(`${API_URL}/rating/${id}`, {
      credentials: "include",
      headers: getCommonHeaders(),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }
      
      const errorData = await response.json().catch(() => ({}));
      console.error("Get rating by id error:", errorData);
      throw new Error(`Failed to fetch rating: ${response.status}${errorData.message ? ` - ${errorData.message}` : ''}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching rating by ID:", error);
    throw error;
  }
};

export const createRating = async (rating: Omit<Rating, 'id'>): Promise<Rating> => {
  console.log("Creating rating:", rating);
  try {
    const response = await fetch(`${API_URL}/rating`, {
      method: "POST",
      credentials: "include",
      headers: getCommonHeaders(),
      body: JSON.stringify(rating),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }
      
      const errorData = await response.json().catch(() => ({}));
      console.error("Create rating error:", errorData);
      throw new Error(`Failed to create rating: ${response.status}${errorData.message ? ` - ${errorData.message}` : ''}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Rating submission error:", error);
    throw error;
  }
};

export const updateRating = async (rating: Rating): Promise<Rating> => {
  console.log("Updating rating:", rating);
  try {
    const response = await fetch(`${API_URL}/rating`, {
      method: "PUT",
      credentials: "include",
      headers: getCommonHeaders(),
      body: JSON.stringify(rating),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }
      
      const errorData = await response.json().catch(() => ({}));
      console.error("Update rating error:", errorData);
      throw new Error(`Failed to update rating: ${response.status}${errorData.message ? ` - ${errorData.message}` : ''}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error updating rating:", error);
    throw error;
  }
};

export const deleteRating = async (id: number): Promise<void> => {
  console.log("Deleting rating with id:", id);
  try {
    const response = await fetch(`${API_URL}/rating/${id}`, {
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
      console.error("Delete rating error:", errorData);
      throw new Error(`Failed to delete rating: ${response.status}${errorData.message ? ` - ${errorData.message}` : ''}`);
    }
    
    await response.text();
  } catch (error) {
    console.error("Error deleting rating:", error);
    throw error;
  }
};