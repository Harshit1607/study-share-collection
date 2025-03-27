
// Configuration for API endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// API endpoints for Java backend
export const ENDPOINTS = {
  NOTES: '/notes',
  SUBJECTS: '/subjects',
  USERS: '/users',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  COMMENTS: '/comments',
  RATINGS: '/ratings',
};
