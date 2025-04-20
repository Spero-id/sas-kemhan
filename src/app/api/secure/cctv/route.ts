import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function GET() {
  try {
    const data = await prisma.cctv.findMany();
    return NextResponse.json({
      status: true,
      data: data
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
    const { name, path_slug, rtsp_url, status } = body;

    const data = await prisma.cctv.create({
      data: {
        "name": name,
        "path_slug": path_slug,
        "rtsp_url": rtsp_url,
        "status": status,
      }
    });

    return NextResponse.json({
      status: true,
      data: data,
      message: 'CCTV created successfully'
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: 'Failed to create CCTV'
    }, { status: 500 });
  }
}