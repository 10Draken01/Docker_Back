// src/infrastructure/db/mongo/schemas/UserSchema.ts
import mongoose, { Schema } from 'mongoose';
import { User as DomainUser } from '../../../../domain/model/User';

const UserSchema = new Schema({
  username: { 
    type: String, 
    required: true,
    minlength: 3,
    trim: true
  },
  class: { 
    type: String, 
    required: true,
    enum: [
      'Mago', 'Guerrero', 'Arquero', 'Paladín', 'Druida', 
      'Alquimista', 'Bardo', 'Nigromante', 'Clérigo', 'Ladrón'
    ]
  },
  level: { 
    type: Number, 
    required: true,
    min: 1,
    max: 100
  },
  avatarIndex: { 
    type: Number, 
    required: true,
    min: 0,
    max: 9
  },
  element: { 
    type: String, 
    required: true,
    enum: [
      'Fuego', 'Agua', 'Tierra', 'Aire', 'Luz',
      'Oscuridad', 'Naturaleza', 'Arcano', 'Tiempo', 'Caos'
    ]
  }
}, {
  timestamps: true,
  versionKey: false,
});

export const UserModel = mongoose.model<DomainUser & mongoose.Document>('User', UserSchema);