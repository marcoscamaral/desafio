import mongoose, { Schema, Document } from 'mongoose';

// Interface para tipagem do documento
interface Weapon {
  name: string;
  mod: number;
  attr: string;
  equipped: boolean;
}

interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface KnightDocument extends Document {
  name: string;
  nickname: string;
  birthday: string;
  weapons: Weapon[];
  attributes: Attributes;
  keyAttribute: keyof Attributes;
  isHero: boolean; //** */ Identifica se o cavaleiro é um herói
}

// Esquema do Mongoose
const WeaponSchema = new Schema<Weapon>({
  name: { type: String, required: true },
  mod: { type: Number, required: true },
  attr: { type: String, required: true },
  equipped: { type: Boolean, default: false },
});

const AttributesSchema = new Schema<Attributes>({
  strength: { type: Number, default: 0 },
  dexterity: { type: Number, default: 0 },
  constitution: { type: Number, default: 0 },
  intelligence: { type: Number, default: 0 },
  wisdom: { type: Number, default: 0 },
  charisma: { type: Number, default: 0 },
});

const KnightSchema = new Schema<KnightDocument>({
  name: { type: String, required: true },
  nickname: { type: String, required: false },
  birthday: { type: String, required: false },
  weapons: { type: [WeaponSchema], default: [] },
  attributes: { type: AttributesSchema, required: true },
  keyAttribute: { type: String, required: true },
  isHero: { type: Boolean, default: false }, //** */ Padrão: Não é herói

});

export const Knight = mongoose.model<KnightDocument>('Knight', KnightSchema);
