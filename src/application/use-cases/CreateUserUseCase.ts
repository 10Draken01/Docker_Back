// src/application/use-cases/CreateUserUseCase.ts
import { User } from '../../domain/model/User';
import { UserService } from '../../domain/repositories/UserService';

export class CreateUserUseCase {
  constructor(private userService: UserService) {}

  async execute(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return this.userService.createUser(userData);
  }
}