import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const prisma = getPrismaClient();
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIAMTX_API}/v3/paths/list`);
        const body = await response.json();
        const cctvList = body.items || [];


            const [cctvData, bodyWormData, helmetData] = await Promise.all([
                prisma.cctv.findMany({
                    orderBy: { name: 'asc' },
                    include: { regions: true }
                }),
                prisma.body_worm.findMany({
                    orderBy: { name: 'asc' },
                    include: { regions: true }
                }),
                prisma.helmet.findMany({
                    orderBy: { name: 'asc' },
                    include: { regions: true }
                }),
            ]);

        const allDevices = [
            ...cctvData.map(item => ({ ...item, type: 'cctv' })),
            ...bodyWormData.map(item => ({ ...item, type: 'body_worm' })),
            ...helmetData.map(item => ({ ...item, type: 'helmet' })),
        ];

        
        const mergedData = allDevices.map(device => {
            const cctvItem = cctvList.find((item: any) => item.name === device.path_slug);
            return {
                ...device,
                status: cctvItem?.ready || false,
            };
        });



        // Hitung jumlah masing-masing device
        const countCCTV = cctvData.length;
        const countBodyWorm = bodyWormData.length;
        const countHelmet = helmetData.length;
        const totalDevices = allDevices.length;

        return NextResponse.json({
            status: true,
            data: mergedData,
            count: {
                cctv: countCCTV,
                body_worm: countBodyWorm,
                helmet: countHelmet,
                total: totalDevices,
            },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                status: false,
                data: [],
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}

