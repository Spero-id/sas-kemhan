import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10);

async function main() {
  // Create Permission
  await prisma.permission.createMany({
    data: [
      { 
        name: 'View User',
        code: 'user.view' 
      },
      { 
        name: 'Create User',
        code: 'user.create' 
      },
      { 
        name: 'Update User',
        code: 'user.update' 
      },
      { 
        name: 'Delete User',
        code: 'user.delete' 
      },
      { 
        name: 'View Role',
        code: 'role.view' 
      },
      { 
        name: 'Create Role',
        code: 'role.create' 
      },
      { 
        name: 'Update Role',
        code: 'role.update' 
      },
      { 
        name: 'Delete Role',
        code: 'role.delete' 
      },
      { 
        name: 'View CCTV',
        code: 'cctv.view' 
      },
      { 
        name: 'Create CCTV',
        code: 'cctv.create' 
      },
      { 
        name: 'Update CCTV',
        code: 'cctv.update' 
      },
      { 
        name: 'Delete CCTV',
        code: 'cctv.delete' 
      },
      { 
        name: 'Dashboard CCTV',
        code: 'dashboard.cctv.view' 
      },
      { 
        name: 'Dashboard Sensor',
        code: 'dashboard.sensor.view' 
      },
      { 
        name: 'Dashboard Body Worn',
        code: 'dashboard.body_worm.view' 
      },
      { 
        name: 'Dashboard Helmet',
        code: 'dashboard.helmet.view' 
      },
    ],
  })

  // Create Role Admin
  const adminRole = await prisma.role.create({
    data: {
      name: 'admin',
    },
  })
  
  const allPermissions = await prisma.permission.findMany({
    select: { id: true },
  })

  await prisma.role_permission.createMany({
    data: allPermissions.map((perm) => ({
      roleId: adminRole.id,
      permissionId: perm.id,
    })),
  })

  // Create Role public
  const publicRole = await prisma.role.create({
    data: {
      name: 'public',
    },
  })

  await prisma.role_permission.createMany({
    data: [
      {
        roleId: publicRole.id,
        permissionId: 13
      },
      {
        roleId: publicRole.id,
        permissionId: 14
      },
      {
        roleId: publicRole.id,
        permissionId: 15
      },
      {
        roleId: publicRole.id,
        permissionId: 16
      },
    ],
  })

  const password = await bcrypt.hash("123456", saltRounds)

  await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: password,
        roleId: adminRole.id,
      },
      {
        name: 'User',
        email: 'user@example.com',
        password: password,
        roleId: publicRole.id,
      },
    ],
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
