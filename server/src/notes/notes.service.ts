import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto, UpdateNoteDto } from './dto';

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
  constructor(@InjectModel('Note') private noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto) {
    const newNote = new this.noteModel({
      title: createNoteDto.title,
      content: createNoteDto.content,
      tags: createNoteDto.tags || [],
      isPinned: createNoteDto.isPinned || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return newNote.save();
  }

  async findAll() {
    return this.noteModel.find().exec();
  }

  async findOne(id: string) {
    return this.noteModel.findById(id).exec();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.noteModel
      .findByIdAndUpdate(
        id,
        {
          ...updateNoteDto,
          updatedAt: new Date().toISOString(),
        },
        { new: true },
      )
      .exec();
    return updatedNote;
  }

  async remove(id: string) {
    const result = await this.noteModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
