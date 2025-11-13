import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Note extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: false })
  isPinned: boolean;

  @Prop({ required: true, default: Date.now })
  createdAt: string;

  @Prop({ required: true, default: Date.now })
  updatedAt: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
