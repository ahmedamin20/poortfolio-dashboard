export const BASE_URL = import.meta.env.VITE_API_URL;
export const ENDPOINTS = {
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  SKILLS: "/api/skills",
  USERS: "/api/users",
  EXPERIENCES: "/api/experiences",
  PROJECTS: "/api/projects",
};
export const HttpResponse = {
  OK: 200,
  CREATED: 201,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  VALIDATION_ERRORS: 422,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UN_AUTHENTICATED: 401,
};
