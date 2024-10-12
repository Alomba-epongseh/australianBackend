import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

console.log('\x1b[035m db connected :) \x1b[0m');
