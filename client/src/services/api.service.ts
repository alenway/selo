// services/api.service.ts
import axios from "axios";

const API_URL =
    import.meta.env.VITE_API_URL || "https://api-selo-notesapp.onrender.com";

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

// API service functions
export const apiService = {
    notes: {
        getAll: () => api.get("/notes"),
        getById: (id: string) => api.get(`/notes/${id}`),
        create: (noteData: any) => api.post("/notes", noteData),
        update: (id: string, noteData: any) =>
            api.put(`/notes/${id}`, noteData), // Changed from patch to put
        delete: (id: string) => api.delete(`/notes/${id}`),
    },
};
