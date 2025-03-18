// src/index.ts
import dotenv from 'dotenv';
import { Server } from './infrastructure/config/server';

dotenv.config();

console.log('🧙‍♂️ Inicializando el portal mágico...');

const server = new Server();
server.start().catch(console.error);