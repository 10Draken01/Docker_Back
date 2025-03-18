// src/application/use-cases/DeleteUserUseCase.ts
import { UserService } from '../../domain/repositories/UserService';

export class DeleteUserUseCase {
  constructor(private userService: UserService) {}

  async execute(id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}