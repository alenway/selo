import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000", // NestJS backend URL
    timeout: 10000,
});

// API service functions
export const apiService = {
    notes: {
        getAll: () => api.get("/notes"),
        getById: (id: string) => api.get(`/notes/${id}`),
        create: (noteData: any) => api.post("/notes", noteData),
        update: (id: string, noteData: any) =>
            api.patch(`/notes/${id}`, noteData),
        delete: (id: string) => api.delete(`/notes/${id}`),
    },
};
