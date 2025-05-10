import { LearningPlan } from "@/types";
import { API_URL } from "./config";

const getCommonHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export const getLearningPlans = async (): Promise<LearningPlan[]> => {
  console.log("Fetching all learning plans from:", `${API_URL}/learning-plans`);
  try {
    const response = await fetch(`${API_URL}/learning-plans`, {
      credentials: "include",
      headers: getCommonHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }

      const errorData = await response.json().catch(() => ({}));
      console.error("Get all learning plans error:", errorData);
      throw new Error(
        `Failed to fetch learning plans: ${response.status}${
          errorData.message ? ` - ${errorData.message}` : ""
        }`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching learning plans:", error);
    throw error;
  }
};

export const getLearningPlanById = async (
  id: number
): Promise<LearningPlan> => {
  console.log("Fetching learning plan with id:", id);
  try {
    const response = await fetch(`${API_URL}/learning-plan/${id}`, {
      credentials: "include",
      headers: getCommonHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }

      const errorData = await response.json().catch(() => ({}));
      console.error("Get learning plan by id error:", errorData);
      throw new Error(
        `Failed to fetch learning plan: ${response.status}${
          errorData.message ? ` - ${errorData.message}` : ""
        }`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching learning plan by ID:", error);
    throw error;
  }
};

export const createLearningPlan = async (
  plan: Omit<LearningPlan, "id">
): Promise<LearningPlan> => {
  console.log("Creating learning plan:", plan);
  try {
    const response = await fetch(`${API_URL}/learning-plan`, {
      method: "POST",
      credentials: "include",
      headers: getCommonHeaders(),
      body: JSON.stringify(plan),
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }

      const errorData = await response.json().catch(() => ({}));
      console.error("Create learning plan error:", errorData);
      throw new Error(
        `Failed to create learning plan: ${response.status}${
          errorData.message ? ` - ${errorData.message}` : ""
        }`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Learning plan submission error:", error);
    throw error;
  }
};

export const updateLearningPlan = async (
  plan: LearningPlan
): Promise<LearningPlan> => {
  console.log("Updating learning plan:", plan);
  try {
    const response = await fetch(`${API_URL}/learning-plan`, {
      method: "PUT",
      credentials: "include",
      headers: getCommonHeaders(),
      body: JSON.stringify(plan),
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("User not authenticated. Redirecting to login...");
      }

      const errorData = await response.json().catch(() => ({}));
      console.error("Update learning plan error:", errorData);
      throw new Error(
        `Failed to update learning plan: ${response.status}${
          errorData.message ? ` - ${errorData.message}` : ""
        }`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error updating learning plan:", error);
    throw error;
  }
};

export const deleteLearningPlan = async (id: number): Promise<void> => {
  console.log("Deleting learning plan with id:", id);
  try {
    const response = await fetch(`${API_URL}/learning-plan/${id}`, {
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
      console.error("Delete learning plan error:", errorData);
      throw new Error(
        `Failed to delete learning plan: ${response.status}${
          errorData.message ? ` - ${errorData.message}` : ""
        }`
      );
    }

    await response.text();
  } catch (error) {
    console.error("Error deleting learning plan:", error);
    throw error;
  }
};
