const { PrismaClient } = require('@prisma/client');

async function testLayoutQuery() {
  const prisma = new PrismaClient();
  
  try {
    // Test the query that's failing
    const layouts = await prisma.layout.findMany({
      include: {
        user: true,
      },
      where: {
        user_id: 1, // Using a test user_id
      }
    });
    
    console.log('Query successful:', layouts);
  } catch (error) {
    console.error('Query failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testLayoutQuery();
