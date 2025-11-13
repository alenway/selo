// pages/NotesPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../../services/api.service";
import type { Note } from "../../types/Note";

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState<string>("all");
    const [sortBy, setSortBy] = useState<"date" | "title">("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [loading, setLoading] = useState(true);

    // Load notes from API
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const response = await apiService.notes.getAll();
                console.log("API Response:", response); // Add this line
                console.log("Response data:", response.data); // Add this line

                // const apiNotes = response.data;

                //real data
                setLoading(true);
                // const response = await apiService.notes.getAll();
                const apiNotes = response.data;

                // Transform API data to match your Note type
                const transformedNotes = apiNotes.map((note: any) => ({
                    id: note._id, // Convert _id to id
                    title: note.title,
                    content: note.content,
                    tags: note.tags,
                    isPinned: note.isPinned,
                    createdAt: new Date(note.createdAt),
                    updatedAt: new Date(note.updatedAt),
                }));

                setNotes(transformedNotes);

                // Optional: Save to localStorage for offline access
                localStorage.setItem("notes", JSON.stringify(transformedNotes));
            } catch (error) {
                console.error("Error fetching notes:", error);
                // Fallback to localStorage if API fails
                const savedNotes = localStorage.getItem("notes");
                if (savedNotes) {
                    const parsedNotes = JSON.parse(savedNotes).map(
                        (note: any) => ({
                            ...note,
                            createdAt: new Date(note.createdAt),
                            updatedAt: new Date(note.updatedAt),
                        })
                    );
                    setNotes(parsedNotes);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    // Get all unique tags from notes
    const allTags = [
        "all",
        ...new Set(notes.flatMap((note) => note.tags).filter((tag) => tag)),
    ];

    // Filter and sort notes
    const filteredNotes = notes
        .filter((note) => {
            const matchesSearch =
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.content.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTag =
                selectedTag === "all" || note.tags.includes(selectedTag);
            return matchesSearch && matchesTag;
        })
        .sort((a, b) => {
            if (sortBy === "date") {
                return sortOrder === "desc"
                    ? new Date(b.updatedAt).getTime() -
                          new Date(a.updatedAt).getTime()
                    : new Date(a.updatedAt).getTime() -
                          new Date(b.updatedAt).getTime();
            } else {
                return sortOrder === "asc"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
        });

    const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
    const otherNotes = filteredNotes.filter((note) => !note.isPinned);

    const handleDeleteNote = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await apiService.notes.delete(id);
                const updatedNotes = notes.filter((note) => note.id !== id);
                setNotes(updatedNotes);
                localStorage.setItem("notes", JSON.stringify(updatedNotes));
            } catch (error) {
                console.error("Error deleting note:", error);
                alert("Failed to delete note");
            }
        }
    };

    const handleTogglePin = async (id: string) => {
        try {
            const noteToUpdate = notes.find((note) => note.id === id);
            if (!noteToUpdate) return;

            const updatedNoteData = {
                ...noteToUpdate,
                isPinned: !noteToUpdate.isPinned,
            };

            await apiService.notes.update(id, updatedNoteData);

            const updatedNotes = notes.map((note) =>
                note.id === id ? { ...note, isPinned: !note.isPinned } : note
            );
            setNotes(updatedNotes);
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
        } catch (error) {
            console.error("Error updating note:", error);
            alert("Failed to update note");
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getPreviewText = (content: string, maxLength: number = 150) => {
        if (!content) return "No content...";
        return content.length > maxLength
            ? content.substring(0, maxLength) + "..."
            : content;
    };

    // Loading state
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">⏳</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        Loading notes...
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            All Notes
                        </h1>
                        <p className="text-gray-600">
                            {filteredNotes.length} note
                            {filteredNotes.length !== 1 ? "s" : ""} found
                        </p>
                    </div>
                    <Link
                        to="/notes/create"
                        className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                    >
                        <PlusIcon />
                        <span>New Note</span>
                    </Link>
                </div>
            </div>

            {/* Search, Filter, and Sort Controls */}
            <div className="mb-8 space-y-4">
                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <SearchIcon />
                            <input
                                type="text"
                                placeholder="Search notes by title or content..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Sort Controls */}
                    <div className="flex space-x-2">
                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value as "date" | "title")
                            }
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="date">Sort by Date</option>
                            <option value="title">Sort by Title</option>
                        </select>
                        <button
                            onClick={() =>
                                setSortOrder(
                                    sortOrder === "asc" ? "desc" : "asc"
                                )
                            }
                            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            {sortOrder === "asc" ? "↑" : "↓"}
                        </button>
                    </div>
                </div>

                {/* Tags Filter */}
                <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                                selectedTag === tag
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            {tag === "all" ? "All Tags" : tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notes Grid */}
            <div className="space-y-8">
                {/* Pinned Notes Section */}
                {pinnedNotes.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <PinIcon className="text-yellow-500" />
                            <span className="ml-2">Pinned Notes</span>
                            <span className="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {pinnedNotes.length}
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pinnedNotes.map((note) => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onDelete={handleDeleteNote}
                                    onTogglePin={handleTogglePin}
                                    formatDate={formatDate}
                                    getPreviewText={getPreviewText}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Other Notes Section */}
                <div>
                    {pinnedNotes.length > 0 && (
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            All Notes
                            <span className="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {otherNotes.length}
                            </span>
                        </h2>
                    )}

                    {filteredNotes.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">
                                📝
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                {searchTerm || selectedTag !== "all"
                                    ? "No notes found"
                                    : "No notes yet"}
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {searchTerm || selectedTag !== "all"
                                    ? "Try adjusting your search or filter criteria"
                                    : "Create your first note to get started"}
                            </p>
                            {!searchTerm && selectedTag === "all" && (
                                <Link
                                    to="/notes/create"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
                                >
                                    <PlusIcon />
                                    <span>Create Your First Note</span>
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherNotes.map((note) => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onDelete={handleDeleteNote}
                                    onTogglePin={handleTogglePin}
                                    formatDate={formatDate}
                                    getPreviewText={getPreviewText}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Note Card Component
interface NoteCardProps {
    note: Note;
    onDelete: (id: string) => void;
    onTogglePin: (id: string) => void;
    formatDate: (date: Date) => string;
    getPreviewText: (content: string, maxLength?: number) => string;
}

const NoteCard: React.FC<NoteCardProps> = ({
    note,
    onDelete,
    onTogglePin,
    formatDate,
    getPreviewText,
}) => {
    const [showActions, setShowActions] = useState(false);

    return (
        <div
            className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 group"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="p-6">
                {/* Note Header */}
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg truncate flex-1 mr-2">
                        {note.title || "Untitled Note"}
                    </h3>
                    <div
                        className={`flex space-x-1 transition-opacity duration-200 ${
                            showActions ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <button
                            onClick={() => onTogglePin(note.id)}
                            className={`p-1 rounded transition-colors duration-200 ${
                                note.isPinned
                                    ? "text-yellow-500 hover:text-yellow-600"
                                    : "text-gray-400 hover:text-gray-600"
                            }`}
                            title={note.isPinned ? "Unpin note" : "Pin note"}
                        >
                            <PinIcon />
                        </button>
                        <Link
                            to={`/notes/edit/${note.id}`}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                            title="Edit note"
                        >
                            <EditIcon />
                        </Link>
                        <button
                            onClick={() => onDelete(note.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                            title="Delete note"
                        >
                            <TrashIcon />
                        </button>
                    </div>
                </div>

                {/* Note Content Preview */}
                <div className="text-gray-600 text-sm mb-4 line-clamp-4 min-h-[60px]">
                    {getPreviewText(note.content)}
                </div>

                {/* Tags */}
                {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {note.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Note Footer */}
                <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span>{formatDate(note.updatedAt)}</span>
                    <span
                        className={`px-2 py-1 rounded-full ${
                            note.isPinned
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        {note.isPinned ? "Pinned" : "Note"}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Icon Components
const PlusIcon: React.FC = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
        />
    </svg>
);

const SearchIcon: React.FC = () => (
    <svg
        className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);

const PinIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg
        className={`w-4 h-4 ${className}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
    </svg>
);

const EditIcon: React.FC = () => (
    <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
    </svg>
);

const TrashIcon: React.FC = () => (
    <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
    </svg>
);

export default Notes;
