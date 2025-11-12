import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotes } from "../../hooks/useNotes";

const CreateNote: React.FC = () => {
    const navigate = useNavigate();
    const { createNote } = useNotes();

    useEffect(() => {
        console.log("✅ CreateNote component mounted!");
        console.log("📁 Current path:", window.location.pathname);
    }, []);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ✅ NEW handleSubmit using backend / useNotes hook
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setError("Please enter a title for your note");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const noteData = {
                title: formData.title.trim(),
                content: formData.content.trim(),
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag)
                    .map((tag) => tag.toLowerCase()),
                isPinned: false,
            };

            await createNote(noteData);
            navigate("/notes");
        } catch (err: any) {
            setError(err.message || "Failed to create note");
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

    const handleClearForm = () => {
        setFormData({
            title: "",
            content: "",
            tags: "",
        });
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

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* ✅ ERROR MESSAGE BLOCK */}
            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <ExclamationIcon />
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Error
                            </h3>
                            <p className="text-sm text-red-700 mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            )}

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
                            Create New Note
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Capture your thoughts and ideas
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
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={handleClearForm}
                            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium border border-gray-300 rounded-lg transition-colors duration-200 hover:bg-gray-50"
                            disabled={isSubmitting}
                        >
                            Clear Form
                        </button>
                        <Link
                            to="/notes"
                            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium border border-gray-300 rounded-lg transition-colors duration-200 hover:bg-gray-50 flex items-center"
                        >
                            Cancel
                        </Link>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            disabled={isSubmitting || !formData.title.trim()}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <SpinnerIcon />
                                    <span>Creating...</span>
                                </>
                            ) : (
                                <>
                                    <SaveIcon />
                                    <span>Create Note</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>

            {/* Quick Tips */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    💡 Quick Tips
                </h3>
                <ul className="text-blue-800 space-y-2 text-sm">
                    <li>
                        • Use descriptive titles to easily find your notes later
                    </li>
                    <li>• Add tags to categorize and filter your notes</li>
                    <li>• You can use basic markdown formatting</li>
                    <li>• Notes sync using your backend logic</li>
                </ul>
            </div>
        </div>
    );
};

/* Icons */
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

const ExclamationIcon: React.FC = () => (
    <svg
        className="w-5 h-5 text-red-400"
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

export default CreateNote;
