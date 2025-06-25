import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../../lib/prisma";
import { exec } from "child_process";

function stopContainer(containerName: string): Promise<boolean> {
  return new Promise((resolve) => {
    exec(`docker rm -f ${containerName}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Failed to stop container: ${stderr}`);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export async function POST(request: Request) {
  const prisma = getPrismaClient();

  try {
    const req = await request.json();
    const id = req.id;

    const helmet = await prisma.helmet.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!helmet) {
      return NextResponse.json({
        status: false,
        message: "Helmet not found",
      });
    }

    const stopped = await stopContainer(helmet.path_slug);

    if (!stopped) {
      return NextResponse.json({
        status: false,
        message: "Failed to stop helmet container",
      });
    }

    await prisma.helmet.update({
      where: { id: helmet.id },
      data: { status: false },
    });

    return NextResponse.json({
      status: true,
      message: "Successfully stopped helmet stream",
    });

  } catch (error) {
    console.error("Error stopping stream:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal error stopping stream",
      },
      { status: 500 }
    );
  }
}
