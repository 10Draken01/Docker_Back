// src/infrastructure/repositories/MongoUserRepository.ts
import { User as DomainUser } from '../../domain/model/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserModel } from '../db/mongo/schemas/UserSchema';

export class MongoUserRepository implements UserRepository {
  async findAll(): Promise<DomainUser[]> {
    const users = await UserModel.find().sort({ createdAt: -1 });
    return users.map(this.mapToDomainUser);
  }

  async findById(id: string): Promise<DomainUser | null> {
    const user = await UserModel.findById(id);
    return user ? this.mapToDomainUser(user) : null;
  }

  async create(userData: Omit<DomainUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<DomainUser> {
    const newUser = new UserModel(userData);
    await newUser.save();
    return this.mapToDomainUser(newUser);
  }

  async update(id: string, userData: Partial<Omit<DomainUser, 'id' | 'createdAt' | 'updatedAt'>>): Promise<DomainUser | null> {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { ...userData, updatedAt: new Date() },
      { new: true }
    );
    return user ? this.mapToDomainUser(user) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }

  private mapToDomainUser(user: any): DomainUser {
    return {
      id: user._id.toString(),
      username: user.username,
      class: user.class,
      level: user.level,
      avatarIndex: user.avatarIndex,
      element: user.element,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}