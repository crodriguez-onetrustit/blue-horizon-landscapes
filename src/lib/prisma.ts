import { PrismaClient } from '@prisma/client'

declare global {
  var __db__: PrismaClient | undefined
}

const prisma = globalThis.__db__ ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__db__ = prisma
}

export default prisma