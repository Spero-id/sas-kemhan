import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

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
    const body = await request.json();
    const { name, email, password } = body;

    const user = await prisma.user.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        name,
        email,
        password
      }
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