import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function seedUsers() {
  await prisma.auth_user.createMany({
    data: [
      {
        email: 'admin@example.com',
        password: '123456',
        role: 'admin',
      },
      {
        email: 'user@example.com',
        password: '123456',
        role: 'public',
      },
    ],
  })
}
