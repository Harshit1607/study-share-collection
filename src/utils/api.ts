
import { Comment, Note, NoteDetail, Rating, Subject, User } from "@/types";

// Mock data
const subjects: Subject[] = [
  { code: "CS101", name: "Introduction to Computer Science", year: 1, semester: 1 },
  { code: "MATH201", name: "Calculus", year: 2, semester: 1 },
  { code: "PHYS101", name: "Physics I", year: 1, semester: 2 },
  { code: "ENG102", name: "English Composition", year: 1, semester: 1 },
  { code: "BIO101", name: "Biology", year: 1, semester: 1 },
  { code: "CHEM101", name: "Chemistry", year: 1, semester: 2 },
  { code: "HIST101", name: "World History", year: 1, semester: 2 },
  { code: "ECON201", name: "Microeconomics", year: 2, semester: 1 },
];

const users: User[] = [
  { id: "1", name: "John Smith", email: "john@example.com" },
  { id: "2", name: "Emma Johnson", email: "emma@example.com" },
  { id: "3", name: "Michael Brown", email: "michael@example.com" },
  { id: "4", name: "Sophia Williams", email: "sophia@example.com" },
];

const files = [
  { fileName: "CS_Notes_Week1.pdf", fileType: "application/pdf", downloadUrl: "#" },
  { fileName: "Calculus_Formulas.pdf", fileType: "application/pdf", downloadUrl: "#" },
  { fileName: "Physics_Summary.docx", fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", downloadUrl: "#" },
  { fileName: "Essay_Structure.pdf", fileType: "application/pdf", downloadUrl: "#" },
  { fileName: "Biology_Diagrams.pdf", fileType: "application/pdf", downloadUrl: "#" },
];

const generateNotes = (): Note[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `note-${i+1}`,
    name: `${subjects[i % subjects.length].name} - Study Notes ${Math.floor(i/subjects.length) + 1}`,
    file: files[i % files.length],
    uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    user: users[i % users.length],
    subject: subjects[i % subjects.length],
    averageRating: 3 + Math.random() * 2,
    commentCount: Math.floor(Math.random() * 10),
  }));
};

const notes = generateNotes();

const generateComments = (noteId: string): Comment[] => {
  return Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
    id: `comment-${noteId}-${i+1}`,
    text: `This is a great note! I found section ${i+1} particularly helpful.`,
    date: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
    user: users[Math.floor(Math.random() * users.length)],
  }));
};

const generateRatings = (noteId: string): Rating[] => {
  return Array.from({ length: Math.floor(Math.random() * 10) + 3 }, (_, i) => ({
    id: `rating-${noteId}-${i+1}`,
    value: Math.floor(Math.random() * 5) + 1,
    date: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000),
    user: users[Math.floor(Math.random() * users.length)],
  }));
};

// Mock API functions
export const fetchNotes = async (): Promise<Note[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(notes);
    }, 500);
  });
};

export const fetchNotesBySubject = async (subjectCode: string): Promise<Note[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(notes.filter(note => note.subject.code === subjectCode));
    }, 500);
  });
};

export const fetchNote = async (id: string): Promise<NoteDetail | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const note = notes.find(n => n.id === id);
      if (!note) {
        resolve(null);
        return;
      }
      
      const noteDetail: NoteDetail = {
        ...note,
        comments: generateComments(id),
        ratings: generateRatings(id),
      };
      
      resolve(noteDetail);
    }, 500);
  });
};

export const fetchSubjects = async (): Promise<Subject[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(subjects);
    }, 300);
  });
};

export const fetchCurrentUser = async (): Promise<User | null> => {
  // Check if we have a token in localStorage
  const token = localStorage.getItem('auth-token');
  
  if (!token) {
    return null;
  }
  
  // In a real application, this would validate the token with the backend
  return users[0]; // Just return the first user for demo purposes
};

export const loginUser = async (email: string, password: string): Promise<{user: User, token: string}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation
      if (email && password) {
        // Find a user with matching email (in a real app, would check password too)
        const user = users.find(u => u.email === email);
        
        if (user) {
          const token = "mock-jwt-token";
          localStorage.setItem('auth-token', token);
          resolve({ user, token });
        } else {
          reject(new Error("Invalid credentials"));
        }
      } else {
        reject(new Error("Email and password are required"));
      }
    }, 800);
  });
};

export const registerUser = async (name: string, email: string, password: string): Promise<{user: User, token: string}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if email is already used
      if (users.some(u => u.email === email)) {
        reject(new Error("Email is already registered"));
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: `user-${users.length + 1}`,
        name,
        email,
      };
      
      // In a real app, would add to database
      // For mock, we'll just simulate success
      const token = "mock-jwt-token";
      localStorage.setItem('auth-token', token);
      resolve({ user: newUser, token });
    }, 1000);
  });
};

export const logoutUser = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('auth-token');
      resolve();
    }, 300);
  });
};

export const addComment = async (noteId: string, text: string): Promise<Comment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        text,
        date: new Date(),
        user: users[0], // Current user
      };
      
      resolve(newComment);
    }, 500);
  });
};

export const addRating = async (noteId: string, value: number): Promise<Rating> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRating: Rating = {
        id: `rating-${Date.now()}`,
        value,
        date: new Date(),
        user: users[0], // Current user
      };
      
      resolve(newRating);
    }, 500);
  });
};

export const uploadNote = async (name: string, subjectCode: string, file: File): Promise<Note> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const subject = subjects.find(s => s.code === subjectCode) || subjects[0];
      
      const newNote: Note = {
        id: `note-${Date.now()}`,
        name,
        file: {
          fileName: file.name,
          fileType: file.type,
          downloadUrl: "#",
        },
        uploadDate: new Date(),
        user: users[0], // Current user
        subject,
        averageRating: 0,
        commentCount: 0,
      };
      
      resolve(newNote);
    }, 1000);
  });
};
