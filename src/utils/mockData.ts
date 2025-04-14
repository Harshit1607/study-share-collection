
import { Comment, Note, NoteDetail, Rating, Subject, User } from "@/types";

// Mock user data
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Harshit",
    email: "harshit@example.com"
  },
  {
    id: "user2",
    name: "Teena",
    email: "teena@example.com"
  },
  {
    id: "user3",
    name: "Pratham",
    email: "pratham@example.com"
  }
];

// Mock subject data
export const mockSubjects: Subject[] = [
  {
    code: "JAVA101",
    name: "Java Programming",
    year: 2,
    semester: 2
  },
  {
    code: "TOC202",
    name: "Theory of Computation",
    year: 2,
    semester: 2
  },
  {
    code: "DBMS301",
    name: "Database Management Systems",
    year: 2,
    semester: 2
  },
  {
    code: "CNS305",
    name: "Computer Networks and Systems",
    year: 2,
    semester: 2
  },
  {
    code: "PSL205",
    name: "Probability, Statistics, and Linear Programming",
    year: 2,
    semester: 2
  },
  {
    code: "TW105",
    name: "Technical Writing",
    year: 2,
    semester: 2
  }
];

// Mock notes data
export const mockNotes: Note[] = [
  {
    id: "note1",
    name: "Java OOP Concepts",
    uploadDate: new Date("2024-03-15"),
    user: mockUsers[0], // Harshit
    subject: mockSubjects[0], // Java
    averageRating: 4.8,
    commentCount: 5,
    file: {
      fileName: "java_oop_concepts.pdf",
      fileType: "application/pdf",
      downloadUrl: "/mock/files/java_oop_concepts.pdf"
    }
  },
  {
    id: "note2",
    name: "TOC - Finite Automata",
    uploadDate: new Date("2024-02-10"),
    user: mockUsers[1], // Teena
    subject: mockSubjects[1], // TOC
    averageRating: 4.5,
    commentCount: 3,
    file: {
      fileName: "toc_finite_automata.pdf",
      fileType: "application/pdf",
      downloadUrl: "/mock/files/toc_finite_automata.pdf"
    }
  },
  {
    id: "note3",
    name: "DBMS Normalization",
    uploadDate: new Date("2024-03-20"),
    user: mockUsers[2], // Pratham
    subject: mockSubjects[2], // DBMS
    averageRating: 4.7,
    commentCount: 4,
    file: {
      fileName: "dbms_normalization.pdf",
      fileType: "application/pdf",
      downloadUrl: "/mock/files/dbms_normalization.pdf"
    }
  },
  {
    id: "note4",
    name: "CNS Cryptography",
    uploadDate: new Date("2024-02-25"),
    user: mockUsers[0], // Harshit
    subject: mockSubjects[3], // CNS
    averageRating: 4.6,
    commentCount: 6,
    file: {
      fileName: "cns_cryptography.pdf",
      fileType: "application/pdf",
      downloadUrl: "/mock/files/cns_cryptography.pdf"
    }
  },
  {
    id: "note5",
    name: "PSL Lab Manual",
    uploadDate: new Date("2024-01-15"),
    user: mockUsers[1], // Teena
    subject: mockSubjects[4], // PSL
    averageRating: 4.3,
    commentCount: 2,
    file: {
      fileName: "psl_lab_manual.pdf",
      fileType: "application/pdf",
      downloadUrl: "/mock/files/psl_lab_manual.pdf"
    }
  },
  {
    id: "note6",
    name: "Technical Report Writing Guide",
    uploadDate: new Date("2024-01-05"),
    user: mockUsers[2], // Pratham
    subject: mockSubjects[5], // TW
    averageRating: 4.9,
    commentCount: 7,
    file: {
      fileName: "technical_writing_guide.pdf",
      fileType: "application/pdf",
      downloadUrl: "/mock/files/technical_writing_guide.pdf"
    }
  }
];

// Mock comments
export const mockComments: Record<string, Comment[]> = {
  "note1": [
    {
      id: "comment1",
      text: "Very detailed explanation of inheritance in Java, thanks!",
      date: new Date("2024-03-16"),
      user: mockUsers[1] // Teena
    },
    {
      id: "comment2",
      text: "Could you add more examples on interfaces?",
      date: new Date("2024-03-17"),
      user: mockUsers[2] // Pratham
    },
    {
      id: "comment3",
      text: "Great notes for beginners in OOP.",
      date: new Date("2024-03-18"),
      user: mockUsers[1] // Teena
    }
  ],
  "note2": [
    {
      id: "comment4",
      text: "This helped me understand DFAs better!",
      date: new Date("2024-02-12"),
      user: mockUsers[0] // Harshit
    },
    {
      id: "comment5",
      text: "Could you add more problems on NFA to DFA conversion?",
      date: new Date("2024-02-15"),
      user: mockUsers[2] // Pratham
    }
  ],
  "note3": [
    {
      id: "comment6",
      text: "The 3NF examples were very helpful.",
      date: new Date("2024-03-22"),
      user: mockUsers[0] // Harshit
    },
    {
      id: "comment7",
      text: "Excellent explanation of functional dependencies.",
      date: new Date("2024-03-25"),
      user: mockUsers[1] // Teena
    }
  ]
};

// Mock ratings
export const mockRatings: Record<string, Rating[]> = {
  "note1": [
    {
      id: "rating1",
      value: 5,
      date: new Date("2024-03-16"),
      user: mockUsers[1] // Teena
    },
    {
      id: "rating2",
      value: 4,
      date: new Date("2024-03-17"),
      user: mockUsers[2] // Pratham
    }
  ],
  "note2": [
    {
      id: "rating3",
      value: 5,
      date: new Date("2024-02-11"),
      user: mockUsers[0] // Harshit
    },
    {
      id: "rating4",
      value: 4,
      date: new Date("2024-02-13"),
      user: mockUsers[2] // Pratham
    }
  ],
  "note3": [
    {
      id: "rating5",
      value: 5,
      date: new Date("2024-03-21"),
      user: mockUsers[0] // Harshit
    },
    {
      id: "rating6",
      value: 5,
      date: new Date("2024-03-22"),
      user: mockUsers[1] // Teena
    }
  ]
};

// Mock note details
export const mockNoteDetails: Record<string, NoteDetail> = {
  "note1": {
    ...mockNotes[0],
    comments: mockComments["note1"],
    ratings: mockRatings["note1"]
  },
  "note2": {
    ...mockNotes[1],
    comments: mockComments["note2"],
    ratings: mockRatings["note2"]
  },
  "note3": {
    ...mockNotes[2],
    comments: mockComments["note3"],
    ratings: mockRatings["note3"]
  },
  "note4": {
    ...mockNotes[3],
    comments: [],
    ratings: []
  },
  "note5": {
    ...mockNotes[4],
    comments: [],
    ratings: []
  },
  "note6": {
    ...mockNotes[5],
    comments: [],
    ratings: []
  }
};

// Simulate auth token storage
export const mockAuthTokens: Record<string, string> = {
  "harshit@example.com": "mock-token-harshit",
  "teena@example.com": "mock-token-teena",
  "pratham@example.com": "mock-token-pratham"
};

// Default logged in user (for testing)
export const defaultLoggedInUser = mockUsers[0]; // Harshit
