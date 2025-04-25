
import { Rating } from "@/types";
import { API_URL } from "./config";

export const getAllRatings = async (): Promise<Rating[]> => {
  const response = await fetch(`${API_URL}/ratings`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch all ratings: ${response.status}`);
  }
  
  return response.json();
};

export const getRatingsByPostId = async (postId: number): Promise<Rating[]> => {
  const response = await fetch(`${API_URL}/ratings?postid=${postId}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ratings: ${response.status}`);
  }
  
  return response.json();
};

export const getRatingById = async (id: number): Promise<Rating> => {
  const response = await fetch(`${API_URL}/rating/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch rating: ${response.status}`);
  }
  
  return response.json();
};

// Generate a random 4-digit ID (between 1000-9999)
const generateUniqueId = (): number => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const createRating = async (rating: Omit<Rating, 'id'> | Rating): Promise<Rating> => {
  try {
    // Generate a new 4-digit ID if one isn't provided
    const ratingWithId = {
      id: 'id' in rating && rating.id ? rating.id : generateUniqueId(),
      postid: rating.postid,
      level: rating.level
    };

    const response = await fetch(`${API_URL}/rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ratingWithId),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to create rating: ${response.status}${errorData ? ` - ${errorData}` : ''}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Rating submission error:", error);
    throw error;
  }
};

export const updateRating = async (rating: Rating): Promise<Rating> => {
  const response = await fetch(`${API_URL}/rating`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rating),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update rating: ${response.status}`);
  }
  
  return response.json();
};

export const deleteRating = async (id: number): Promise<void> => {
  // Fix the URL path to match the API endpoint format
  const response = await fetch(`${API_URL}/rating/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete rating: ${response.status}`);
  }
};
