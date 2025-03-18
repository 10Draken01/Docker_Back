// src/application/use-cases/UpdateUserUseCase.ts
import { User } from '../../domain/model/User';
import { UserService } from '../../domain/repositories/UserService';

export class UpdateUserUseCase {
  constructor(private userService: UserService) {}

  async execute(id: string, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User | null> {
    return this.userService.updateUser(id, userData);
  }
}