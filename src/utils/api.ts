import { Comment, Note, NoteDetail, Rating, Subject, User } from "@/types";
import { 
  mockAuthTokens,
  mockComments,
  mockNoteDetails,
  mockNotes, 
  mockRatings,
  mockSubjects, 
  mockUsers, 
  defaultLoggedInUser
} from "./mockData";

// Helper function to simulate API delay
const simulateApiDelay = async () => {
  const delay = Math.random() * 300 + 200; // Between 200-500ms
  return new Promise(resolve => setTimeout(resolve, delay));
};

// API functions that use mock data instead of connecting to backend
export const fetchNotes = async (): Promise<Note[]> => {
  console.log("API (Mock): Fetching all notes");
  await simulateApiDelay();
  return [...mockNotes];
};

export const fetchNotesBySubject = async (subjectCode: string): Promise<Note[]> => {
  console.log(`API (Mock): Fetching notes for subject ${subjectCode}`);
  await simulateApiDelay();
  return mockNotes.filter(note => note.subject.code === subjectCode);
};

export const fetchNote = async (id: string): Promise<NoteDetail | null> => {
  console.log(`API (Mock): Fetching note detail for ID ${id}`);
  await simulateApiDelay();
  
  const noteDetail = mockNoteDetails[id];
  
  if (!noteDetail) {
    console.error(`Note with ID ${id} not found`);
    return null;
  }
  
  return { ...noteDetail };
};

export const fetchSubjects = async (): Promise<Subject[]> => {
  console.log("API (Mock): Fetching all subjects");
  await simulateApiDelay();
  return [...mockSubjects];
};

export const fetchCurrentUser = async (): Promise<User | null> => {
  console.log("API (Mock): Fetching current user");
  await simulateApiDelay();
  
  const token = localStorage.getItem('auth-token');
  
  if (!token) {
    console.log("No auth token found, returning default user for testing");
    // For testing, you can return the default user 
    // Uncomment the line below to automatically be logged in as Harshit
    return defaultLoggedInUser;
    // return null;
  }
  
  // Find user by token
  const userIndex = Object.values(mockAuthTokens).findIndex(t => t === token);
  if (userIndex === -1) {
    localStorage.removeItem('auth-token');
    return null;
  }
  
  const email = Object.keys(mockAuthTokens)[userIndex];
  const user = mockUsers.find(u => u.email === email);
  
  return user || null;
};

export const loginUser = async (email: string, password: string): Promise<{user: User, token: string}> => {
  console.log(`API (Mock): Login attempt for ${email}`);
  await simulateApiDelay();
  
  // In a real app, we would verify the password
  // Here we just check if the user exists
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    throw new Error("Invalid email or password");
  }
  
  const token = mockAuthTokens[user.email];
  
  if (!token) {
    throw new Error("Authentication failed");
  }
  
  localStorage.setItem('auth-token', token);
  
  return { user, token };
};

export const registerUser = async (name: string, email: string, password: string): Promise<{user: User, token: string}> => {
  console.log(`API (Mock): Register attempt for ${email}`);
  await simulateApiDelay();
  
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    throw new Error("Email is already in use");
  }
  
  // In a real app, we would create a new user in the database
  // Here we just pretend it worked
  const newUser: User = {
    id: `user${mockUsers.length + 1}`,
    name,
    email
  };
  
  const token = `mock-token-${email.split('@')[0]}`;
  
  localStorage.setItem('auth-token', token);
  
  return { user: newUser, token };
};

export const logoutUser = async (): Promise<void> => {
  console.log("API (Mock): Logging out user");
  await simulateApiDelay();
  
  localStorage.removeItem('auth-token');
  return;
};

export const addComment = async (noteId: string, text: string): Promise<Comment> => {
  console.log(`API (Mock): Adding comment to note ${noteId}`);
  await simulateApiDelay();
  
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error("Authentication required");
  }
  
  // Find user by token
  const userIndex = Object.values(mockAuthTokens).findIndex(t => t === token);
  if (userIndex === -1) {
    throw new Error("Invalid authentication");
  }
  
  const email = Object.keys(mockAuthTokens)[userIndex];
  const user = mockUsers.find(u => u.email === email);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  const newComment: Comment = {
    id: `comment${Date.now()}`,
    text,
    date: new Date(),
    user
  };
  
  // In a real app, we would add this comment to the database
  // For the mock, we don't actually modify the mock data to keep it simple
  
  return newComment;
};

export const addRating = async (noteId: string, value: number): Promise<Rating> => {
  console.log(`API (Mock): Adding rating ${value} to note ${noteId}`);
  await simulateApiDelay();
  
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error("Authentication required");
  }
  
  // Find user by token
  const userIndex = Object.values(mockAuthTokens).findIndex(t => t === token);
  if (userIndex === -1) {
    throw new Error("Invalid authentication");
  }
  
  const email = Object.keys(mockAuthTokens)[userIndex];
  const user = mockUsers.find(u => u.email === email);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  const newRating: Rating = {
    id: `rating${Date.now()}`,
    value,
    date: new Date(),
    user
  };
  
  // In a real app, we would add this rating to the database
  // For the mock, we don't actually modify the mock data to keep it simple
  
  return newRating;
};

export const uploadNote = async (name: string, subjectCode: string, file: File): Promise<Note> => {
  console.log(`API (Mock): Uploading note "${name}" for subject ${subjectCode}`);
  await simulateApiDelay();
  
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error("Authentication required");
  }
  
  // Find user by token
  const userIndex = Object.values(mockAuthTokens).findIndex(t => t === token);
  if (userIndex === -1) {
    throw new Error("Invalid authentication");
  }
  
  const email = Object.keys(mockAuthTokens)[userIndex];
  const user = mockUsers.find(u => u.email === email);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  const subject = mockSubjects.find(s => s.code === subjectCode);
  
  if (!subject) {
    throw new Error("Subject not found");
  }
  
  const newNote: Note = {
    id: `note${Date.now()}`,
    name,
    uploadDate: new Date(),
    user,
    subject,
    averageRating: 0,
    commentCount: 0,
    file: {
      fileName: file.name,
      fileType: file.type,
      downloadUrl: URL.createObjectURL(file)
    }
  };
  
  // In a real app, we would save this note to the database
  // For the mock, we don't actually modify the mock data to keep it simple
  
  return newNote;
};
