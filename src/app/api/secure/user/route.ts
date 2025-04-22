import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { saveFileToDisk } from '@/utils/file';

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10);

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "public"
      }
    });
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
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const image = formData.get('image') as File;
    
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const fileUrl = await saveFileToDisk(image); 
    
    const user = await prisma.user.create({
      data: {
        "name": name,
        "email": email,
        "password": passwordHash,
        "role": "public",
        "image": fileUrl
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