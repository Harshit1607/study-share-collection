
import { Comment, Note, NoteDetail, Rating, Subject, User } from "@/types";
import { API_BASE_URL, ENDPOINTS } from "./config";

// Helper function for making API requests
const apiRequest = async <T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<T> => {
  const token = localStorage.getItem('auth-token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
    mode: 'cors',
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  try {
    console.log(`Making API request to: ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Real API functions that connect to Java backend
export const fetchNotes = async (): Promise<Note[]> => {
  return apiRequest<Note[]>(ENDPOINTS.NOTES);
};

export const fetchNotesBySubject = async (subjectCode: string): Promise<Note[]> => {
  return apiRequest<Note[]>(`${ENDPOINTS.NOTES}?subject=${subjectCode}`);
};

export const fetchNote = async (id: string): Promise<NoteDetail | null> => {
  try {
    return await apiRequest<NoteDetail>(`${ENDPOINTS.NOTES}/${id}`);
  } catch (error) {
    console.error("Error fetching note:", error);
    return null;
  }
};

export const fetchSubjects = async (): Promise<Subject[]> => {
  return apiRequest<Subject[]>(ENDPOINTS.SUBJECTS);
};

export const fetchCurrentUser = async (): Promise<User | null> => {
  // Check if we have a token in localStorage
  const token = localStorage.getItem('auth-token');
  
  if (!token) {
    return null;
  }
  
  try {
    return await apiRequest<User>(`${ENDPOINTS.USERS}/me`);
  } catch (error) {
    // Token might be invalid
    localStorage.removeItem('auth-token');
    return null;
  }
};

export const loginUser = async (email: string, password: string): Promise<{user: User, token: string}> => {
  const data = await apiRequest<{user: User, token: string}>(
    ENDPOINTS.AUTH.LOGIN,
    'POST',
    { email, password }
  );
  
  localStorage.setItem('auth-token', data.token);
  return data;
};

export const registerUser = async (name: string, email: string, password: string): Promise<{user: User, token: string}> => {
  const data = await apiRequest<{user: User, token: string}>(
    ENDPOINTS.AUTH.REGISTER,
    'POST',
    { name, email, password }
  );
  
  localStorage.setItem('auth-token', data.token);
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await apiRequest(ENDPOINTS.AUTH.LOGOUT, 'POST');
  localStorage.removeItem('auth-token');
};

export const addComment = async (noteId: string, text: string): Promise<Comment> => {
  return apiRequest<Comment>(
    `${ENDPOINTS.COMMENTS}`,
    'POST',
    { noteId, text }
  );
};

export const addRating = async (noteId: string, value: number): Promise<Rating> => {
  return apiRequest<Rating>(
    `${ENDPOINTS.RATINGS}`,
    'POST',
    { noteId, value }
  );
};

export const uploadNote = async (name: string, subjectCode: string, file: File): Promise<Note> => {
  // For file uploads, we need to use FormData
  const formData = new FormData();
  formData.append('name', name);
  formData.append('subjectCode', subjectCode);
  formData.append('file', file);
  
  const token = localStorage.getItem('auth-token');
  const headers: HeadersInit = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.NOTES}`, {
    method: 'POST',
    headers,
    credentials: 'include',
    mode: 'cors',
    body: formData,
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  
  return response.json();
};
