import mongoose, { Schema, Document } from 'mongoose';

export interface HeroDocument extends Document {
  knightId: string;
  name: string;
  nickname: string;
}

const HeroSchema = new Schema<HeroDocument>({
  knightId: { type: String, required: true },
  name: { type: String, required: true },
  nickname: { type: String, required: false },
});

export const HallOfHeroes = mongoose.model<HeroDocument>('HallOfHeroes', HeroSchema);
