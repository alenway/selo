// pages/EditNotePage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Note } from "../../types/Note";

const EditNote: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadNote = () => {
            try {
                const savedNotes = localStorage.getItem("notes");
                if (savedNotes) {
                    const notes: Note[] = JSON.parse(savedNotes);
                    const noteToEdit = notes.find((note) => note.id === id);

                    if (noteToEdit) {
                        setFormData({
                            title: noteToEdit.title,
                            content: noteToEdit.content,
                            tags: noteToEdit.tags.join(", "),
                        });
                    } else {
                        alert("Note not found!");
                        navigate("/notes");
                    }
                }
            } catch (error) {
                console.error("Error loading note:", error);
                alert("Error loading note. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        loadNote();
    }, [id, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert("Please enter a title for your note");
            return;
        }

        setIsSubmitting(true);

        try {
            const savedNotes = localStorage.getItem("notes");
            if (savedNotes) {
                const notes: Note[] = JSON.parse(savedNotes);
                const updatedNotes = notes.map((note) =>
                    note.id === id
                        ? {
                              ...note,
                              title: formData.title.trim(),
                              content: formData.content.trim(),
                              tags: formData.tags
                                  .split(",")
                                  .map((tag) => tag.trim())
                                  .filter((tag) => tag)
                                  .map((tag) => tag.toLowerCase()),
                              updatedAt: new Date(),
                          }
                        : note
                );

                localStorage.setItem("notes", JSON.stringify(updatedNotes));
                alert("Note updated successfully!");
                navigate("/notes");
            }
        } catch (error) {
            console.error("Error updating note:", error);
            alert("Error updating note. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const suggestedTags = [
        "personal",
        "work",
        "ideas",
        "important",
        "todo",
        "shopping",
        "meeting",
    ];

    const addSuggestedTag = (tag: string) => {
        const currentTags = formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t);

        if (!currentTags.includes(tag)) {
            const newTags = [...currentTags, tag].join(", ");
            setFormData((prev) => ({
                ...prev,
                tags: newTags,
            }));
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading note...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                    <Link
                        to="/notes"
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                        <ArrowLeftIcon />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Edit Note
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Update your note content
                        </p>
                    </div>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-md border border-gray-200"
            >
                <div className="p-6 space-y-6">
                    {/* Title Field */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            placeholder="Enter a title for your note..."
                            required
                            maxLength={100}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Required field</span>
                            <span>{formData.title.length}/100</span>
                        </div>
                    </div>

                    {/* Content Field */}
                    <div>
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            rows={12}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
                            placeholder="Start writing your note content here..."
                            maxLength={5000}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Markdown supported</span>
                            <span>{formData.content.length}/5000</span>
                        </div>
                    </div>

                    {/* Tags Field */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label
                                htmlFor="tags"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Tags
                            </label>
                            <span className="text-xs text-gray-500">
                                Separate with commas
                            </span>
                        </div>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            placeholder="personal, work, ideas..."
                        />

                        {/* Suggested Tags */}
                        <div className="mt-3">
                            <p className="text-sm text-gray-600 mb-2">
                                Suggested tags:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {suggestedTags.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => addSuggestedTag(tag)}
                                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors duration-200 flex items-center space-x-1"
                                    >
                                        <span>+</span>
                                        <span>{tag}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    {formData.content && (
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                                Preview
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4 border">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    {formData.title || "Untitled Note"}
                                </h4>
                                <div className="text-gray-600 whitespace-pre-wrap">
                                    {formData.content || "No content yet..."}
                                </div>
                                {formData.tags && (
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {formData.tags
                                            .split(",")
                                            .map((tag) => tag.trim())
                                            .filter((tag) => tag)
                                            .map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-between items-center px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
                    <Link
                        to="/notes"
                        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium border border-gray-300 rounded-lg transition-colors duration-200 hover:bg-gray-50 flex items-center"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={isSubmitting || !formData.title.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        {isSubmitting ? (
                            <>
                                <SpinnerIcon />
                                <span>Updating...</span>
                            </>
                        ) : (
                            <>
                                <SaveIcon />
                                <span>Update Note</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

// Reuse the same icons from CreateNotePage
const ArrowLeftIcon: React.FC = () => (
    <svg
        className="w-6 h-6"
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

const SaveIcon: React.FC = () => (
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
            d="M5 13l4 4L19 7"
        />
    </svg>
);

const SpinnerIcon: React.FC = () => (
    <svg
        className="w-5 h-5 animate-spin"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
    </svg>
);

export default EditNote;
