
import { Comment, Note, NoteDetail, Rating, Subject, User } from "@/types";
import { API_BASE_URL, ENDPOINTS } from "./config";

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
};

// API functions that connect to the real backend
export const fetchNotes = async (): Promise<Note[]> => {
  console.log("API: Fetching all notes");
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.NOTES}`);
  return handleResponse(response);
};

export const fetchNotesBySubject = async (subjectCode: string): Promise<Note[]> => {
  console.log(`API: Fetching notes for subject ${subjectCode}`);
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.NOTES}?subject=${subjectCode}`);
  return handleResponse(response);
};

export const fetchNote = async (id: string): Promise<NoteDetail | null> => {
  console.log(`API: Fetching note detail for ID ${id}`);
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.NOTES}/${id}`);
  
  if (!response.ok && response.status === 404) {
    console.error(`Note with ID ${id} not found`);
    return null;
  }
  
  return handleResponse(response);
};

export const fetchSubjects = async (): Promise<Subject[]> => {
  console.log("API: Fetching all subjects");
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SUBJECTS}`);
  return handleResponse(response);
};

export const fetchCurrentUser = async (): Promise<User | null> => {
  console.log("API: Fetching current user");
  const token = localStorage.getItem('auth-token');
  
  if (!token) {
    return null;
  }
  
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.USERS}/current`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    localStorage.removeItem('auth-token');
    return null;
  }
  
  return handleResponse(response);
};

export const loginUser = async (email: string, password: string): Promise<{user: User, token: string}> => {
  console.log(`API: Login attempt for ${email}`);
  
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  const data = await handleResponse(response);
  
  if (data.token) {
    localStorage.setItem('auth-token', data.token);
  }
  
  return data;
};

export const registerUser = async (name: string, email: string, password: string): Promise<{user: User, token: string}> => {
  console.log(`API: Register attempt for ${email}`);
  
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.REGISTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });
  
  const data = await handleResponse(response);
  
  if (data.token) {
    localStorage.setItem('auth-token', data.token);
  }
  
  return data;
};

export const logoutUser = async (): Promise<void> => {
  console.log("API: Logging out user");
  const token = localStorage.getItem('auth-token');
  
  if (token) {
    await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.LOGOUT}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).catch(error => console.error("Logout error:", error));
  }
  
  localStorage.removeItem('auth-token');
  return;
};

export const addComment = async (noteId: string, text: string): Promise<Comment> => {
  console.log(`API: Adding comment to note ${noteId}`);
  
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error("Authentication required");
  }
  
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.NOTES}/${noteId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });
  
  return handleResponse(response);
};

export const addRating = async (noteId: string, value: number): Promise<Rating> => {
  console.log(`API: Adding rating ${value} to note ${noteId}`);
  
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error("Authentication required");
  }
  
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.NOTES}/${noteId}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ value })
  });
  
  return handleResponse(response);
};

export const uploadNote = async (name: string, subjectCode: string, file: File): Promise<Note> => {
  console.log(`API: Uploading note "${name}" for subject ${subjectCode}`);
  
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error("Authentication required");
  }
  
  const formData = new FormData();
  formData.append('name', name);
  formData.append('subjectCode', subjectCode);
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.NOTES}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  return handleResponse(response);
};
