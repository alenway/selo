// pages/NotFoundPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                {/* Animated 404 */}
                <div className="relative mb-8">
                    <div className="text-9xl font-bold text-blue-600 opacity-20">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl font-bold text-gray-900">
                            Page Not Found
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-6xl mb-4">😕</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Lost in Space?
                    </h1>
                    <p className="text-gray-600 mb-8">
                        The page you're looking for doesn't exist or has been
                        moved to a different galaxy.
                    </p>

                    <div className="space-y-4">
                        <Link
                            to="/"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 block text-center"
                        >
                            🚀 Back to Home
                        </Link>

                        <Link
                            to="/notes"
                            className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 block text-center"
                        >
                            📝 Go to Notes
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="w-full text-gray-600 hover:text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                        >
                            ↩️ Go Back
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
                            <div>
                                <div className="font-semibold text-gray-900">
                                    500+
                                </div>
                                <div>Users</div>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">
                                    10K+
                                </div>
                                <div>Notes</div>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">
                                    99.9%
                                </div>
                                <div>Uptime</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="mt-8 text-gray-500 text-sm">
                    Need help?{" "}
                    <Link
                        to="/contact"
                        className="text-blue-600 hover:text-blue-700"
                    >
                        Contact support
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
