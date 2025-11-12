// components/Header.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
    logo?: string;
    companyName?: string;
    onLoginClick?: () => void;
    onSignupClick?: () => void;
}

interface NavItem {
    id: string;
    label: string;
    href: string;
    icon?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
    logo = "QuickNotes",
    companyName = "Note Taking App",
    onLoginClick,
    onSignupClick,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems: NavItem[] = [
        {
            id: "home",
            label: "Home",
            href: "/",
            icon: <HomeIcon />,
        },
        {
            id: "notes",
            label: "All Notes",
            href: "/notes",
            icon: <NotesIcon />,
        },
        {
            id: "archive",
            label: "Archive",
            href: "/archive",
            icon: <ArchiveIcon />,
        },
        {
            id: "trash",
            label: "Trash",
            href: "/trash",
            icon: <TrashIcon />,
        },
    ];

    const isActiveLink = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section - Now with Link */}
                    <Link
                        to="/"
                        className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
                    >
                        <div className="text-2xl font-bold text-blue-600">
                            {logo}
                        </div>
                        <span className="text-gray-600 text-sm hidden sm:block">
                            {companyName}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.href}
                                className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                    isActiveLink(item.href)
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons & Create Note */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/notes/create"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <PlusIcon />
                            <span>New Note</span>
                        </Link>
                        <button
                            onClick={onLoginClick}
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                        >
                            Login
                        </button>
                        <button
                            onClick={onSignupClick}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden flex flex-col space-y-1 p-2"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`w-6 h-0.5 bg-gray-600 transition-transform duration-200 ${
                                isMobileMenuOpen
                                    ? "rotate-45 translate-y-1.5"
                                    : ""
                            }`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-gray-600 transition-opacity duration-200 ${
                                isMobileMenuOpen ? "opacity-0" : ""
                            }`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-gray-600 transition-transform duration-200 ${
                                isMobileMenuOpen
                                    ? "-rotate-45 -translate-y-1.5"
                                    : ""
                            }`}
                        />
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-200 ease-in-out ${
                        isMobileMenuOpen
                            ? "max-h-96 opacity-100 py-4"
                            : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                >
                    <nav className="flex flex-col space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.href}
                                className={`flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-colors duration-200 ${
                                    isActiveLink(item.href)
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                        <div className="border-t border-gray-200 pt-4 mt-2">
                            <Link
                                to="/notes/create"
                                className="flex items-center space-x-3 px-3 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 mb-3"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <PlusIcon />
                                <span>New Note</span>
                            </Link>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        onLoginClick?.();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex-1 text-center text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => {
                                        onSignupClick?.();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-center"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

// Icon Components (keep your existing icons)
const HomeIcon: React.FC = () => (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
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

const ArchiveIcon: React.FC = () => (
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
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
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

export default Header;
