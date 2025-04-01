
import { Comment, Note, NoteDetail, Rating, Subject, User } from "@/types";

// Mock user data
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Smith",
    email: "john@example.com"
  },
  {
    id: "user2",
    name: "Emma Wilson",
    email: "emma@example.com"
  },
  {
    id: "user3",
    name: "Michael Johnson",
    email: "michael@example.com"
  }
];

// Mock subject data
export const mockSubjects: Subject[] = [
  {
    code: "CS101",
    name: "Introduction to Computer Science",
    year: 1,
    semester: 1
  },
  {
    code: "MATH201",
    name: "Advanced Calculus",
    year: 2,
    semester: 1
  },
  {
    code: "PHYS101",
    name: "Physics Fundamentals",
    year: 1,
    semester: 2
  },
  {
    code: "ENG205",
    name: "Technical Writing",
    year: 2,
    semester: 1
  },
  {
    code: "BIO110",
    name: "Introduction to Biology",
    year: 1,
    semester: 1
  },
  {
    code: "HIST150",
    name: "World History",
    year: 1,
    semester: 2
  }
];

// Mock notes data
export const mockNotes: Note[] = [
  {
    id: "note1",
    name: "CS101 Lecture Notes - Algorithms",
    uploadDate: new Date("2023-09-10"),
    user: mockUsers[0],
    subject: mockSubjects[0],
    averageRating: 4.5,
    commentCount: 3,
    file: {
      fileName: "cs101_algorithms.pdf",
      fileType: "application/pdf",
      downloadUrl: "/mock/files/cs101_algorithms.pdf"
    }
  },
  {
    id: "note2",
    name: "Calculus Formulas and Examples",
    uploadDate: new Date("2023-08-15"),
    user: mockUsers[1],
    subject: mockSubjects[1],
    averageRating: 5.0,
    commentCount: 5,
    file: {
      fileName: "calculus_formulas.pdf",
      fileType: "application/pdf",
      downloadUrl: "/mock/files/calculus_formulas.pdf"
    }
  },
  {
    id: "note3",
    name: "Physics Lab Report Template",
    uploadDate: new Date("2023-10-05"),
    user: mockUsers[2],
    subject: mockSubjects[2],
    averageRating: 4.0,
    commentCount: 2,
    file: {
      fileName: "physics_lab_template.docx",
      fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      downloadUrl: "/mock/files/physics_lab_template.docx"
    }
  },
  {
    id: "note4",
    name: "Technical Writing Guidelines",
    uploadDate: new Date("2023-07-22"),
    user: mockUsers[0],
    subject: mockSubjects[3],
    averageRating: 4.2,
    commentCount: 4,
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
      text: "These notes were very helpful. Thanks for sharing!",
      date: new Date("2023-09-12"),
      user: mockUsers[1]
    },
    {
      id: "comment2",
      text: "Could you add more examples for the sorting algorithms?",
      date: new Date("2023-09-15"),
      user: mockUsers[2]
    },
    {
      id: "comment3",
      text: "Great explanation of recursive functions.",
      date: new Date("2023-09-18"),
      user: mockUsers[0]
    }
  ],
  "note2": [
    {
      id: "comment4",
      text: "This saved me before the midterm!",
      date: new Date("2023-08-20"),
      user: mockUsers[2]
    },
    {
      id: "comment5",
      text: "The examples really helped clarify the concepts.",
      date: new Date("2023-08-22"),
      user: mockUsers[0]
    }
  ]
};

// Mock ratings
export const mockRatings: Record<string, Rating[]> = {
  "note1": [
    {
      id: "rating1",
      value: 5,
      date: new Date("2023-09-11"),
      user: mockUsers[1]
    },
    {
      id: "rating2",
      value: 4,
      date: new Date("2023-09-14"),
      user: mockUsers[2]
    }
  ],
  "note2": [
    {
      id: "rating3",
      value: 5,
      date: new Date("2023-08-16"),
      user: mockUsers[0]
    },
    {
      id: "rating4",
      value: 5,
      date: new Date("2023-08-19"),
      user: mockUsers[2]
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
    comments: [],
    ratings: []
  },
  "note4": {
    ...mockNotes[3],
    comments: [],
    ratings: []
  }
};

// Simulate auth token storage
export const mockAuthTokens: Record<string, string> = {
  "john@example.com": "mock-token-john",
  "emma@example.com": "mock-token-emma",
  "michael@example.com": "mock-token-michael"
};

// Default logged in user (for testing)
export const defaultLoggedInUser = mockUsers[0];
