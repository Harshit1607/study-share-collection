
import { Comment, Note, NoteDetail, Rating, Subject, User } from "@/types";
import { ENDPOINTS } from "./config";
import { 
  mockUsers, 
  mockSubjects, 
  mockNotes, 
  mockNoteDetails, 
  mockComments, 
  mockRatings,
  mockAuthTokens,
  defaultLoggedInUser
} from "./mockData";

// Helper function to simulate API delay
const simulateApiDelay = async <T>(data: T): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 300); // Simulate network delay of 300ms
  });
};

// Mock API functions that use our mock data
export const fetchNotes = async (): Promise<Note[]> => {
  console.log("Mock API: Fetching all notes");
  return simulateApiDelay(mockNotes);
};

export const fetchNotesBySubject = async (subjectCode: string): Promise<Note[]> => {
  console.log(`Mock API: Fetching notes for subject ${subjectCode}`);
  const filteredNotes = mockNotes.filter(note => note.subject.code === subjectCode);
  return simulateApiDelay(filteredNotes);
};

export const fetchNote = async (id: string): Promise<NoteDetail | null> => {
  console.log(`Mock API: Fetching note detail for ID ${id}`);
  const noteDetail = mockNoteDetails[id];
  
  if (!noteDetail) {
    console.error(`Note with ID ${id} not found`);
    return null;
  }
  
  return simulateApiDelay(noteDetail);
};

export const fetchSubjects = async (): Promise<Subject[]> => {
  console.log("Mock API: Fetching all subjects");
  return simulateApiDelay(mockSubjects);
};

export const fetchCurrentUser = async (): Promise<User | null> => {
  console.log("Mock API: Fetching current user");
  const token = localStorage.getItem('auth-token');
  
  if (!token) {
    return simulateApiDelay(null);
  }
  
  // In a real app, we'd validate the token
  // For mock purposes, we'll just return the default user
  return simulateApiDelay(defaultLoggedInUser);
};

export const loginUser = async (email: string, password: string): Promise<{user: User, token: string}> => {
  console.log(`Mock API: Login attempt for ${email}`);
  
  // Simulate authentication logic
  await simulateApiDelay(null);
  
  const user = mockUsers.find(u => u.email === email);
  
  if (!user || password !== "password") { // Any password "password" works for mock
    throw new Error("Invalid email or password");
  }
  
  const token = mockAuthTokens[email];
  localStorage.setItem('auth-token', token);
  
  return {
    user,
    token
  };
};

export const registerUser = async (name: string, email: string, password: string): Promise<{user: User, token: string}> => {
  console.log(`Mock API: Register attempt for ${email}`);
  
  // Simulate registration logic
  await simulateApiDelay(null);
  
  if (mockUsers.some(u => u.email === email)) {
    throw new Error("Email already in use");
  }
  
  // Create a new mock user
  const newUser: User = {
    id: `user${mockUsers.length + 1}`,
    name,
    email
  };
  
  // In a real app, we'd persist this user
  mockUsers.push(newUser);
  mockAuthTokens[email] = `mock-token-${email}`;
  
  const token = mockAuthTokens[email];
  localStorage.setItem('auth-token', token);
  
  return {
    user: newUser,
    token
  };
};

export const logoutUser = async (): Promise<void> => {
  console.log("Mock API: Logging out user");
  localStorage.removeItem('auth-token');
  return simulateApiDelay(undefined);
};

export const addComment = async (noteId: string, text: string): Promise<Comment> => {
  console.log(`Mock API: Adding comment to note ${noteId}`);
  
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error("Authentication required");
  }
  
  // Get the current user (for this mock, we use the default)
  const user = defaultLoggedInUser;
  
  // Create a new comment
  const newComment: Comment = {
    id: `comment${Date.now()}`,
    text,
    date: new Date(),
    user
  };
  
  // Add to our mock comments
  if (!mockComments[noteId]) {
    mockComments[noteId] = [];
  }
  
  mockComments[noteId].push(newComment);
  
  // Update comment count
  const note = mockNotes.find(n => n.id === noteId);
  if (note) {
    note.commentCount++;
  }
  
  // Update note details
  if (mockNoteDetails[noteId]) {
    mockNoteDetails[noteId].comments.push(newComment);
    mockNoteDetails[noteId].commentCount = mockNoteDetails[noteId].comments.length;
  }
  
  return simulateApiDelay(newComment);
};

export const addRating = async (noteId: string, value: number): Promise<Rating> => {
  console.log(`Mock API: Adding rating ${value} to note ${noteId}`);
  
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error("Authentication required");
  }
  
  // Get the current user (for this mock, we use the default)
  const user = defaultLoggedInUser;
  
  // Create a new rating
  const newRating: Rating = {
    id: `rating${Date.now()}`,
    value,
    date: new Date(),
    user
  };
  
  // Add to our mock ratings
  if (!mockRatings[noteId]) {
    mockRatings[noteId] = [];
  }
  
  // Remove previous rating by this user if exists
  const existingRatingIndex = mockRatings[noteId].findIndex(r => r.user.id === user.id);
  if (existingRatingIndex >= 0) {
    mockRatings[noteId].splice(existingRatingIndex, 1);
  }
  
  mockRatings[noteId].push(newRating);
  
  // Update average rating
  const note = mockNotes.find(n => n.id === noteId);
  if (note) {
    const ratings = mockRatings[noteId] || [];
    const sum = ratings.reduce((acc, r) => acc + r.value, 0);
    note.averageRating = ratings.length > 0 ? sum / ratings.length : 0;
  }
  
  // Update note details
  if (mockNoteDetails[noteId]) {
    // If this user already rated, replace the rating
    const detailRatingIndex = mockNoteDetails[noteId].ratings.findIndex(r => r.user.id === user.id);
    if (detailRatingIndex >= 0) {
      mockNoteDetails[noteId].ratings[detailRatingIndex] = newRating;
    } else {
      mockNoteDetails[noteId].ratings.push(newRating);
    }
    
    // Update average rating
    const ratings = mockNoteDetails[noteId].ratings;
    const sum = ratings.reduce((acc, r) => acc + r.value, 0);
    mockNoteDetails[noteId].averageRating = ratings.length > 0 ? sum / ratings.length : 0;
  }
  
  return simulateApiDelay(newRating);
};

export const uploadNote = async (name: string, subjectCode: string, file: File): Promise<Note> => {
  console.log(`Mock API: Uploading note "${name}" for subject ${subjectCode}`);
  
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error("Authentication required");
  }
  
  // Get the current user (for this mock, we use the default)
  const user = defaultLoggedInUser;
  
  // Find the selected subject
  const subject = mockSubjects.find(s => s.code === subjectCode);
  if (!subject) {
    throw new Error(`Subject with code ${subjectCode} not found`);
  }
  
  // Create a new note
  const newNote: Note = {
    id: `note${mockNotes.length + 1}`,
    name,
    uploadDate: new Date(),
    user,
    subject,
    averageRating: 0,
    commentCount: 0,
    file: {
      fileName: file.name,
      fileType: file.type,
      downloadUrl: `/mock/files/${file.name}`
    }
  };
  
  // Add to our mock notes
  mockNotes.push(newNote);
  
  // Create empty comments and ratings arrays
  mockComments[newNote.id] = [];
  mockRatings[newNote.id] = [];
  
  // Create a note detail object
  mockNoteDetails[newNote.id] = {
    ...newNote,
    comments: [],
    ratings: []
  };
  
  return simulateApiDelay(newNote);
};
