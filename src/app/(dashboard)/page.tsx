"use client";

import { searchDashboardAtom } from "@/common/module/SettingsJotai";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import Navigation from "@/components/Navigation/Navigation";
import RecordingCamera from "@/components/RecordingCamera";
import { useAllCctv } from "@/services/api/cctv/get/get.hooks";
import { Cctv } from "@/types/Cctv/TypeCctv";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { MdPushPin } from "react-icons/md";
import GridLayout from "react-grid-layout";

const MEDIAMTX_URL = process.env.NEXT_PUBLIC_MEDIAMTX_URL;

export default function Home() {
  const [searchDashboard] = useAtom(searchDashboardAtom);
  const { isLoading, data } = useAllCctv();

  const layout =
    data?.data?.map((item: Cctv, index: number) => ({
      i: item.path_slug || String(index),
      x: (index * 4) % 12, // biar grid-nya nyebar
      y: Math.floor(index / 3) * 2,
      w: 4,
      h: 2,
    })) ?? [];

  return (
    <>
      <Navigation />
      {isLoading ? (
        <LoadingGetData />
      ) : (
        <GridLayout
          className="layout pointer-events-none"
          layout={layout}
          cols={12}
          rowHeight={100}
          width={1850}
          isDraggable
          isResizable
        >
          {data?.data?.map((item: Cctv, i: number) => (
            <div
              data-grid={layout[i]}
              className={`group relative overflow-hidden h-full w-full pointer-events-none ${
                item.name.toLowerCase().includes(searchDashboard.toLowerCase())
                  ? ""
                  : "hidden"
              }`}
              key={i}
            >
              {/* IFRAME as background */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-auto">
                <iframe
                  src={`${MEDIAMTX_URL}/${item.path_slug}`}
                  allow="fullscreen; autoplay; encrypted-media"
                  className="w-full h-full pointer-events-auto border-none"
                  title={item.path_slug}
                />
              </div>

              {/* FRAME IMAGE OVERLAY */}
                <Image
                  src="/images/frame.png"
                  alt="frame"
                  fill
                  className="z-10 pointer-events-none group-hover:hidden"
                />
                <Image
                  src="/images/frame-active.png"
                  alt="frame-active"
                  fill
                  className="z-10 pointer-events-none hidden group-hover:block"
                />

              {/* OVERLAY & CONTROL LAYER */}
              <div className="relative h-full border border-dark-ocean z-20 pointer-events-auto">
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {item.name}
                </div>

                <div className="absolute bottom-9 right-3 flex flex-col gap-1 z-30 pointer-events-auto">
                  <RecordingCamera
                    key={i}
                    pathSlug={item.path_slug}
                    rtspUrl={`rtsp://192.168.100.10:8554/${item.path_slug}`}
                    outputPath={`/recordings/${item.path_slug}`}
                  />
                  <Link
                    href={`/cctv/1`}
                    className="p-1 rounded text-white text-lg pointer-events-auto"
                  >
                    <MdPushPin />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </GridLayout>
      )}
    </>
  );
}
