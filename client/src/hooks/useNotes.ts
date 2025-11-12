import { useEffect, useState } from "react";
import { apiService } from "../services/api.service";

export interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
}

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadNotes = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiService.notes.getAll();
            setNotes(response.data);
        } catch (err: any) {
            setError("Failed to load notes from server");
            console.error("Error loading notes:", err);
        } finally {
            setLoading(false);
        }
    };

    const createNote = async (
        noteData: Omit<Note, "id" | "createdAt" | "updatedAt">
    ) => {
        try {
            const response = await apiService.notes.create(noteData);
            setNotes((prev) => [response.data, ...prev]);
            return response.data;
        } catch (err: any) {
            throw new Error("Failed to create note");
        }
    };

    const updateNote = async (id: string, noteData: Partial<Note>) => {
        try {
            const response = await apiService.notes.update(id, noteData);
            setNotes((prev) =>
                prev.map((note) => (note.id === id ? response.data : note))
            );
            return response.data;
        } catch (err: any) {
            throw new Error("Failed to update note");
        }
    };

    const deleteNote = async (id: string) => {
        try {
            await apiService.notes.delete(id);
            setNotes((prev) => prev.filter((note) => note.id !== id));
        } catch (err: any) {
            throw new Error("Failed to delete note");
        }
    };

    useEffect(() => {
        loadNotes();
    }, []);

    return {
        notes,
        loading,
        error,
        loadNotes,
        createNote,
        updateNote,
        deleteNote,
    };
};
