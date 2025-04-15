import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcrypt'

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10);

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({
      status: true,
      data: users
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: false,
      data: [],
      message: 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await prisma.user.create({
      data: {
        "name": name,
        "email": email,
        "password": passwordHash,
        "role": "public"
      }
    });

    return NextResponse.json({
      status: true,
      data: user,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: 'Failed to create user'
    }, { status: 500 });
  }
}