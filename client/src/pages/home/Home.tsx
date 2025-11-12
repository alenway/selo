// pages/HomePage.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Hero Section */}
            <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Welcome to{" "}
                        <span className="text-blue-600">QuickNotes</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Capture your thoughts, organize your ideas, and boost
                        your productivity with our simple and powerful
                        note-taking app.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/notes"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/notes/create"
                            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
                        >
                            Create First Note
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        Why Choose QuickNotes?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon="🚀"
                            title="Lightning Fast"
                            description="Create and access your notes instantly with our optimized performance."
                        />
                        <FeatureCard
                            icon="🔒"
                            title="Secure & Private"
                            description="Your notes are stored locally and never shared with anyone."
                        />
                        <FeatureCard
                            icon="📱"
                            title="Responsive Design"
                            description="Works perfectly on all devices - desktop, tablet, and mobile."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready to Organize Your Thoughts?
                    </h2>
                    <p className="text-blue-100 text-lg mb-6">
                        Join thousands of users who have transformed their
                        note-taking experience.
                    </p>
                    <Link
                        to="/notes/create"
                        className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 inline-block"
                    >
                        Start Taking Notes Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

// Feature Card Component
interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description,
}) => (
    <div className="text-center p-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default Home;
