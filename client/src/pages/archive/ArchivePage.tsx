// pages/ArchivePage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Note } from "../types/Note";

const ArchivePage: React.FC = () => {
    const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            const notes: Note[] = JSON.parse(savedNotes);
            // For now, let's assume archived notes have isArchived: true
            // You can implement actual archiving logic later
            const archived = notes.filter((note) => note.isArchived);
            setArchivedNotes(archived);
        }
    }, []);

    const filteredNotes = archivedNotes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUnarchiveNote = (id: string) => {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            const notes: Note[] = JSON.parse(savedNotes);
            const updatedNotes = notes.map((note) =>
                note.id === id ? { ...note, isArchived: false } : note
            );
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
            setArchivedNotes(updatedNotes.filter((note) => note.isArchived));
        }
    };

    const handleDeleteNote = (id: string) => {
        if (
            window.confirm(
                "Are you sure you want to delete this archived note?"
            )
        ) {
            const savedNotes = localStorage.getItem("notes");
            if (savedNotes) {
                const notes: Note[] = JSON.parse(savedNotes);
                const updatedNotes = notes.filter((note) => note.id !== id);
                localStorage.setItem("notes", JSON.stringify(updatedNotes));
                setArchivedNotes(
                    updatedNotes.filter((note) => note.isArchived)
                );
            }
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Archive
                        </h1>
                        <p className="text-gray-600">
                            {archivedNotes.length} archived note
                            {archivedNotes.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <Link
                        to="/notes"
                        className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                    >
                        <ArrowLeftIcon />
                        <span>Back to Notes</span>
                    </Link>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search archived notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Archived Notes */}
            {filteredNotes.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        {archivedNotes.length === 0
                            ? "No archived notes"
                            : "No notes found"}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {archivedNotes.length === 0
                            ? "Notes you archive will appear here for safekeeping."
                            : "Try adjusting your search criteria."}
                    </p>
                    {archivedNotes.length === 0 && (
                        <Link
                            to="/notes"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
                        >
                            <NotesIcon />
                            <span>View All Notes</span>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.map((note) => (
                        <div
                            key={note.id}
                            className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
                        >
                            <h3 className="font-semibold text-gray-900 text-lg mb-2 truncate">
                                {note.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {note.content || (
                                    <span className="text-gray-400 italic">
                                        No content...
                                    </span>
                                )}
                            </p>

                            {note.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {note.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                <span>
                                    Archived {formatDate(note.updatedAt)}
                                </span>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleUnarchiveNote(note.id)}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors duration-200"
                                >
                                    Unarchive
                                </button>
                                <button
                                    onClick={() => handleDeleteNote(note.id)}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Icon Components
const ArrowLeftIcon: React.FC = () => (
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
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

const NotesIcon: React.FC = () => (
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
    </svg>
);

export default ArchivePage;
