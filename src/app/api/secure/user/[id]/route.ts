import { NextResponse } from 'next/server';
import prisma from '../../../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { saveFileToDisk, deleteFileFromDisk } from '@/utils/file';

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10);

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(params.id)
      }
    });

    if (!user) {
      return NextResponse.json({
        status: false,
        message: 'User not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      status: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const image = formData.get('image') as File;

    const data = await prisma.user.findFirst({
      where: {
        id: parseInt(params.id)
      }
    });

    const req: {
      name: string;
      email: string;
      password?: string;
      image?: string;
    } = {
      name,
      email,
    };

    if (password) {
      req['password'] = await bcrypt.hash(password, saltRounds);
    }

    if (image) {
      if (data?.image) {
        deleteFileFromDisk(data.image);
      }
      const fileUrl = await saveFileToDisk(image);
      req['image'] = fileUrl;
    }

    const user = await prisma.user.update({
      where: {
        id: parseInt(params.id)
      },
      data: req
    });

    return NextResponse.json({
      status: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await prisma.user.findFirst({
      where: {
        id: parseInt(params.id)
      }
    });

    if (data?.image) {
      deleteFileFromDisk(data.image);
    }

    await prisma.user.delete({
      where: {
        id: parseInt(params.id)
      },
    });

    return NextResponse.json({
      status: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}