import prisma from "../lib/prisma"
import bcrypt from 'bcrypt'

const saltRounds = 10

async function main() {
  const password = await bcrypt.hash("123456", saltRounds)

  await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: password,
        role: 'admin',
      },
      {
        name: 'User',
        email: 'user@example.com',
        password: password,
        role: 'public',
      },
    ],
    skipDuplicates: true, // optional: biar gak error kalau email sudah ada
  })
}

main()
  .then(() => {
    console.log('Seeding done!')
  })
  .catch((e) => {
    console.error('Error during seeding:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
