import { getPrismaClient } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export const dynamic = "force-dynamic";
const MEDIAMTX_STUN=process.env.MEDIAMTX_STUN
const MEDIAMTX_ADDITIONAL_HOSTS=(process.env.MEDIAMTX_ADDITIONAL_HOSTS ?? '').split(',').map(h => h.trim()).filter(Boolean);

export async function POST() {
  const prisma = getPrismaClient();
  try {
    const config = {
      rtmp: true,
      rtmpAddress: ":1935",
      webrtc: true,
      webrtcAddress: ":8889",
      webrtcEncryption: false,
      webrtcAllowOrigin: "*",
      webrtcTrustedProxies: [],
      webrtcLocalUDPAddress: ":8189",
      webrtcLocalTCPAddress: '',
      webrtcIPsFromInterfaces: false,
      webrtcIPsFromInterfacesList: [],
      webrtcAdditionalHosts: [MEDIAMTX_ADDITIONAL_HOSTS.join(',')],
      webrtcICEServers2: [
        {
          url: MEDIAMTX_STUN,
        },
      ],
      webrtcHandshakeTimeout: "10s",
      webrtcTrackGatherTimeout: "2s",
      webrtcSTUNGatherTimeout: "5s",
      paths: {} as Record<string, { source: string }>,
    };

    // Ambil semua data dari DB
    const cctv = await prisma.cctv.findMany();
    const bodyWorm = await prisma.body_worm.findMany();
    const helmet = await prisma.helmet.findMany();

    for (const device of cctv) {
      if (device.path_slug && device.rtsp_url) {
        config.paths[device.path_slug] = {
          source: device.rtsp_url,
        };
      }
    }
    
    const allDevices = [...bodyWorm, ...helmet];
    
    for (const device of allDevices) {
      if (device.path_slug && device.rtsp_url) {
        config.paths[device.path_slug] = {
          source: 'publisher',
        };
      }
    }

    const yamlStr = yaml.dump(config, { noRefs: true, lineWidth: -1 });
    const filePath = path.join(process.cwd(), "config/mediamtx.yml");
    fs.writeFileSync(filePath, yamlStr, "utf8");

    execSync('docker restart mediamtx')

    await prisma.settings.update({
      where: {
        name: 'regenerate_mediamtx',
      },
      data: {
        value: 'true',
      },
    });

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