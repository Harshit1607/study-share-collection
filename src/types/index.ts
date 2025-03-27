
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Subject {
  code: string;
  name: string;
  year: number;
  semester: number;
}

export interface Note {
  id: string;
  name: string;
  file: File;
  uploadDate: Date;
  user: User;
  subject: Subject;
  averageRating: number;
  commentCount: number;
}

export interface File {
  fileName: string;
  fileType: string;
  downloadUrl: string;
}

export interface Comment {
  id: string;
  text: string;
  date: Date;
  user: User;
}

export interface Rating {
  id: string;
  value: number;
  date: Date;
  user: User;
}

export interface NoteDetail extends Note {
  comments: Comment[];
  ratings: Rating[];
}
