// src/infrastructure/controllers/UserController.ts
import { Request, Response } from 'express';
import { GetUsersUseCase } from '../../application/use-cases/GetUsersUseCase';
import { GetUserByIdUseCase } from '../../application/use-cases/GetUserByIdUseCase';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { UpdateUserUseCase } from '../../application/use-cases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../application/use-cases/DeleteUserUseCase';

export class UserController {
  constructor(
    private getUsersUseCase: GetUsersUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getUsersUseCase.execute();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error interno del servidor' 
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.getUserByIdUseCase.execute(id);
      
      if (!user) {
        res.status(404).json({ 
          success: false, 
          error: 'Usuario no encontrado' 
        });
        return;
      }
      
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error('Error getting user by id:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error interno del servidor' 
      });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ 
          success: false, 
          error: error.message 
        });
      } else {
        console.error('Error creating user:', error);
        res.status(500).json({ 
          success: false, 
          error: 'Error interno del servidor' 
        });
      }
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.updateUserUseCase.execute(id, req.body);
      
      if (!user) {
        res.status(404).json({ 
          success: false, 
          error: 'Usuario no encontrado' 
        });
        return;
      }
      
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ 
          success: false, 
          error: error.message 
        });
      } else {
        console.error('Error updating user:', error);
        res.status(500).json({ 
          success: false, 
          error: 'Error interno del servidor' 
        });
      }
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.deleteUserUseCase.execute(id);
      
      if (!deleted) {
        res.status(404).json({ 
          success: false, 
          error: 'Usuario no encontrado' 
        });
        return;
      }
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error interno del servidor' 
      });
    }
  }
}