// src/infrastructure/routes/userRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export const userRoutes = (userController: UserController): Router => {
  const router = Router();

  router.get('/', (req, res) => userController.getUsers(req, res));
  router.get('/:id', (req, res) => userController.getUserById(req, res));
  router.post('/', (req, res) => userController.createUser(req, res));
  router.put('/:id', (req, res) => userController.updateUser(req, res));
  router.delete('/:id', (req, res) => userController.deleteUser(req, res));

  return router;
};