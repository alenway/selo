// pages/TrashPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Note } from "../../types/Note";

const TrashPage: React.FC = () => {
    const [deletedNotes, setDeletedNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            const notes: Note[] = JSON.parse(savedNotes);
            // For now, let's assume deleted notes have isDeleted: true
            // You can implement actual trash logic later
            const deleted = notes.filter((note) => note.isDeleted);
            setDeletedNotes(deleted);
        }
    }, []);

    const filteredNotes = deletedNotes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRestoreNote = (id: string) => {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            const notes: Note[] = JSON.parse(savedNotes);
            const updatedNotes = notes.map((note) =>
                note.id === id ? { ...note, isDeleted: false } : note
            );
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
            setDeletedNotes(updatedNotes.filter((note) => note.isDeleted));
        }
    };

    const handlePermanentDelete = (id: string) => {
        if (
            window.confirm(
                "Are you sure you want to permanently delete this note? This action cannot be undone."
            )
        ) {
            const savedNotes = localStorage.getItem("notes");
            if (savedNotes) {
                const notes: Note[] = JSON.parse(savedNotes);
                const updatedNotes = notes.filter((note) => note.id !== id);
                localStorage.setItem("notes", JSON.stringify(updatedNotes));
                setDeletedNotes(updatedNotes.filter((note) => note.isDeleted));
            }
        }
    };

    const handleEmptyTrash = () => {
        if (deletedNotes.length === 0) return;

        if (
            window.confirm(
                `Are you sure you want to permanently delete all ${deletedNotes.length} notes? This action cannot be undone.`
            )
        ) {
            const savedNotes = localStorage.getItem("notes");
            if (savedNotes) {
                const notes: Note[] = JSON.parse(savedNotes);
                const updatedNotes = notes.filter((note) => !note.isDeleted);
                localStorage.setItem("notes", JSON.stringify(updatedNotes));
                setDeletedNotes([]);
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
                            Trash
                        </h1>
                        <p className="text-gray-600">
                            {deletedNotes.length} deleted note
                            {deletedNotes.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <div className="flex space-x-3 mt-4 sm:mt-0">
                        {deletedNotes.length > 0 && (
                            <button
                                onClick={handleEmptyTrash}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                            >
                                <TrashIcon />
                                <span>Empty Trash</span>
                            </button>
                        )}
                        <Link
                            to="/notes"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <ArrowLeftIcon />
                            <span>Back to Notes</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search deleted notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Warning Banner */}
            {deletedNotes.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                        <ExclamationIcon />
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                                Notes in trash will be deleted permanently after
                                30 days
                            </h3>
                            <p className="text-sm text-yellow-700 mt-1">
                                You can restore notes or delete them
                                permanently.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Deleted Notes */}
            {filteredNotes.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🗑️</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        {deletedNotes.length === 0
                            ? "Trash is empty"
                            : "No notes found"}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {deletedNotes.length === 0
                            ? "Notes you delete will be moved to trash and kept for 30 days."
                            : "Try adjusting your search criteria."}
                    </p>
                    {deletedNotes.length === 0 && (
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
                            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 opacity-75"
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
                                    Deleted {formatDate(note.updatedAt)}
                                </span>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleRestoreNote(note.id)}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors duration-200"
                                >
                                    Restore
                                </button>
                                <button
                                    onClick={() =>
                                        handlePermanentDelete(note.id)
                                    }
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors duration-200"
                                >
                                    Delete Permanently
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

const TrashIcon: React.FC = () => (
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
    </svg>
);

const ExclamationIcon: React.FC = () => (
    <svg
        className="w-5 h-5 text-yellow-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
    </svg>
);

export default TrashPage;
