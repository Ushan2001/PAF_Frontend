import { LearningPlan } from "@/types";
import { API_URL } from "./config";

export const getLearningPlans = async (): Promise<LearningPlan[]> => {
  const response = await fetch(`${API_URL}/learning-plans`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch learning plans: ${response.status}`);
  }
  
  return response.json();
};

export const getLearningPlanById = async (id: number): Promise<LearningPlan> => {
  const response = await fetch(`${API_URL}/learning-plan/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch learning plan: ${response.status}`);
  }
  
  return response.json();
};

export const createLearningPlan = async (plan: Omit<LearningPlan, 'id'>): Promise<LearningPlan> => {
  const response = await fetch(`${API_URL}/learning-plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(plan),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create learning plan: ${response.status}`);
  }
  
  return response.json();
};

export const updateLearningPlan = async (plan: LearningPlan): Promise<LearningPlan> => {
  const response = await fetch(`${API_URL}/learning-plan`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(plan),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update learning plan: ${response.status}`);
  }
  
  return response.json();
};

export const deleteLearningPlan = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/learning-plan/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete learning plan: ${response.status}`);
  }
};
