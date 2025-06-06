import { getPrismaClient } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export const dynamic = "force-dynamic";
const MEDIAMTX_STUN=process.env.MEDIAMTX_STUN

export async function POST() {
  console.log(MEDIAMTX_STUN)
  const prisma = getPrismaClient();
  try {
    // Ambil semua data dari DB
    const cctv = await prisma.cctv.findMany();
    const bodyWorm = await prisma.body_worm.findMany();
    const helmet = await prisma.helmet.findMany();

    const allDevices = [...cctv, ...bodyWorm, ...helmet];

    const config = {
      webrtc: true,
      webrtcAddress: ":8889",
      webrtcEncryption: false,
      webrtcAllowOrigin: "*",
      rtmp: true,
      rtmpAddress: ":1935",
      webrtcICEServers2: [
        {
          url: MEDIAMTX_STUN,
        },
      ],
      paths: {} as Record<string, { source: string }>,
    };

    for (const device of allDevices) {
      if (device.path_slug && device.rtsp_url) {
        config.paths[device.path_slug] = {
          source: device.rtsp_url,
        };
      }
    }

    const yamlStr = yaml.dump(config, { noRefs: true, lineWidth: -1 });
    const filePath = path.join(process.cwd(), "config/mediamtx.yml");
    fs.writeFileSync(filePath, yamlStr, "utf8");

    execSync('docker restart mediamtx')

    return NextResponse.json({
      message: "mediamtx.yml generated",
      count: allDevices.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to generate mediamtx.yml", details: err.message },
      { status: 500 }
    );
  }
}
