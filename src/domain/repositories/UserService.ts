// src/domain/services/UserService.ts
import { User } from '../model/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // Validaciones de dominio
    if (userData.level < 1 || userData.level > 100) {
      throw new Error('El nivel debe estar entre 1 y 100');
    }
    
    if (!userData.username || userData.username.trim().length < 3) {
      throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
    }
    
    return this.userRepository.create(userData);
  }

  async updateUser(id: string, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User | null> {
    // Validaciones de dominio para actualización
    if (userData.level !== undefined && (userData.level < 1 || userData.level > 100)) {
      throw new Error('El nivel debe estar entre 1 y 100');
    }
    
    if (userData.username !== undefined && userData.username.trim().length < 3) {
      throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
    }
    
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}