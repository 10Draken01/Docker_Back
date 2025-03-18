// src/application/use-cases/GetUsersUseCase.ts
import { User } from '../../domain/model/User';
import { UserService } from '../../domain/repositories/UserService';

export class GetUsersUseCase {
  constructor(private userService: UserService) {}

  async execute(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}