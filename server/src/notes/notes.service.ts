import { Injectable } from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from './dto';

// For now, we'll use in-memory storage. Later you can add a database.
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class NotesService {
  private notes: Note[] = [];

  create(createNoteDto: CreateNoteDto) {
    const note: Note = {
      id: Date.now().toString(),
      title: createNoteDto.title,
      content: createNoteDto.content,
      tags: createNoteDto.tags || [],
      isPinned: createNoteDto.isPinned || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.notes.push(note);
    return note;
  }

  findAll() {
    return this.notes;
  }

  findOne(id: string) {
    return this.notes.find((note) => note.id === id);
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return null;
    }

    this.notes[noteIndex] = {
      ...this.notes[noteIndex],
      ...updateNoteDto,
      updatedAt: new Date().toISOString(),
    };

    return this.notes[noteIndex];
  }

  remove(id: string) {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return false;
    }

    this.notes.splice(noteIndex, 1);
    return true;
  }
}
