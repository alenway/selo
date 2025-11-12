// routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import NotesPage from "../pages/notes/Notes";
import CreateNote from "../pages/createNote/CreateNote";
// import EditNotePage from "../pages/EditNotePage";
// import ArchivePage from "../pages/ArchivePage";
// import TrashPage from "../pages/TrashPage";
// import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/notes/create" element={<CreateNote />} />
            {/* <Route path="/notes/edit/:id" element={<EditNotePage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/trash" element={<TrashPage />} />
            <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
    );
};

export default AppRoutes;
