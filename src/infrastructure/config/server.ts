// src/infrastructure/config/server.ts
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRoutes } from '../routes/userRoutes';
import { UserController } from '../controllers/UserController';
import { MongoUserRepository } from '../repositories/MongoUserRepository';
import { GetUsersUseCase } from '../../application/use-cases/GetUsersUseCase';
import { GetUserByIdUseCase } from '../../application/use-cases/GetUserByIdUseCase';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { UpdateUserUseCase } from '../../application/use-cases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../application/use-cases/DeleteUserUseCase';
import { UserService } from '../../domain/repositories/UserService';

export class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3001';
    
    this.middlewares();
    this.routes();
  }

  private async connectDB(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/magicalusers');
      console.log('✨ Base de datos conectada exitosamente ✨');
    } catch (error) {
      console.error('💀 Error al conectar con la base de datos:', error);
      process.exit(1);
    }
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    
    // Middleware para servir las imágenes de avatar
    this.app.use('/avatars', express.static('public/avatars'));
    
    // Middleware de logging
    this.app.use((req, res, next) => {
      console.log(`🔮 ${req.method} ${req.url}`);
      next();
    });
  }

  private routes(): void {
    // Inicialización de dependencias (Inyección de dependencias manual)
    const userRepository = new MongoUserRepository();
    const userService = new UserService(userRepository);
    
    const getUsersUseCase = new GetUsersUseCase(userService);
    const getUserByIdUseCase = new GetUserByIdUseCase(userService);
    const createUserUseCase = new CreateUserUseCase(userService);
    const updateUserUseCase = new UpdateUserUseCase(userService);
    const deleteUserUseCase = new DeleteUserUseCase(userService);
    
    const userController = new UserController(
      getUsersUseCase,
      getUserByIdUseCase,
      createUserUseCase,
      updateUserUseCase,
      deleteUserUseCase
    );

    this.app.use('/api/users', userRoutes(userController));
    
    // Ruta de bienvenida
    this.app.get('/', (_, res) => {
      res.json({
        message: '✨ API del Gremio de Aventureros ✨',
        endpoints: {
          users: '/api/users'
        }
      });
    });
  }

  public async start(): Promise<void> {
    await this.connectDB();
    
    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor mágico corriendo en el puerto ${this.port}`);
    });
  }
}