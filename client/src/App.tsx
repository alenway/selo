// App.tsx
import React from "react";
import { Route, Routes } from "react-router-dom"; // Add these imports
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import CreateNote from "./pages/createNote/CreateNote";
import EditNotePage from "./pages/editNote/EditNote";
import HomePage from "./pages/home/Home";
import NotesPage from "./pages/notes/Notes";
import ArchivePage from "./pages/archive/ArchivePage";
import TrashPage from "./pages/trashPage/TrashPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";

const App: React.FC = () => {
    const handleLogin = () => {
        console.log("Login clicked");
    };

    const handleSignup = () => {
        console.log("Signup clicked");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header
                logo="QuickNotes"
                companyName="Note Taking App"
                onLoginClick={handleLogin}
                onSignupClick={handleSignup}
            />

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/notes" element={<NotesPage />} />
                    <Route path="/notes/create" element={<CreateNote />} />
                    <Route path="/notes/edit/:id" element={<EditNotePage />} />
                    <Route path="/archive" element={<ArchivePage />} />
                    <Route path="/trash" element={<TrashPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            <Footer companyName="QuickNotes Inc." year={2024} />
        </div>
    );
};

export default App;
