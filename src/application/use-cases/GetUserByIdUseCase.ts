// src/application/use-cases/GetUserByIdUseCase.ts
import { User } from '../../domain/model/User';
import { UserService } from '../../domain/repositories/UserService';

export class GetUserByIdUseCase {
  constructor(private userService: UserService) {}

  async execute(id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }
}