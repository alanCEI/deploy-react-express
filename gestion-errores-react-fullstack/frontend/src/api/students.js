import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
});

export const getStudents = () => api.get("/students");
export const createStudent = (studentData) =>
  api.post("/students", studentData);
