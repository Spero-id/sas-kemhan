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
import { useState } from "react";

const MEDIAMTX_URL = process.env.NEXT_PUBLIC_MEDIAMTX_URL;

export default function Home() {
  const [searchDashbcoard] = useAtom(searchDashboardAtom);
  const { isLoading, data } = useAllCctv();

  const [layout] = useState([
    { i: "1", x: 0, y: 0, w: 4, h: 2 },
    { i: "2", x: 4, y: 0, w: 4, h: 2 },
    { i: "3", x: 8, y: 0, w: 4, h: 2 },
  ]);

  return (
    <>
      <Navigation />
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}z
        rowHeight={100}
        width={1900}
        isDraggable
        isResizable
      >
        {data?.data?.map((item: Cctv, i: number) => (
          <div
            className={`group relative overflow-hidden h-56 ${
              item.name.toLowerCase().includes(searchDashboard.toLowerCase())
                ? ""
                : "hidden"
            }`}
            key={i}
          >
            {/* IFRAME as background */}
            <iframe
              src="http://localhost:8889/camera1/"
              allow="fullscreen; autoplay; encrypted-media"
              className="absolute w-full h-full z-10 pointer-events-auto"
            ></iframe>

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
            <div className="relative h-full border border-dark-ocean z-20 pointer-events-none">
              <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                {item.name}
              </div>

              <div className="absolute bottom-9 right-3 flex flex-col gap-1 z-30">
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
    </>
  );
}
