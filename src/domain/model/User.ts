// src/domain/model/User.ts
export interface User {
    id: string;
    username: string;
    class: string;
    level: number;
    avatarIndex: number;
    element: string;
    createdAt: Date;
    updatedAt: Date;
  }