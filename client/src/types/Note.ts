// types/Note.ts
export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    isPinned: boolean;
    isArchived?: boolean;
    isDeleted?: boolean;
}
