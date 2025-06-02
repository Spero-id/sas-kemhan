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
import { useDetailLayout } from "@/services/api/layout/get/get.hooks";
import { useEffect, useState } from "react";

const MEDIAMTX_URL = process.env.NEXT_PUBLIC_MEDIAMTX_URL;

export default function Home() {
  const [searchDashboard] = useAtom(searchDashboardAtom);
  const { isLoading, data } = useAllCctv();

  const { data: dataLayout, isLoading: isLoadingLayout } = useDetailLayout({
    id: "1", // layout cctv
  });

  const [layout, setLayout] = useState<any[]>();

  useEffect(() => {
    if (!isLoadingLayout && !isLoading && data?.data) {
      const rawLayout = dataLayout?.data.layout.layout;
      const layoutArray = Array.isArray(rawLayout) ? rawLayout : [];

      const mappingLayout = layoutArray
        .filter((item) =>
          data.data.some((cctv: Cctv) => cctv.path_slug === item.i)
        )
        .map((item) => {
          const matchedCctv = data.data.find(
            (cctv: Cctv) => cctv.path_slug === item.i
          );
          item.data = matchedCctv!;
          return item;
        });

      setLayout(mappingLayout);
    }
  }, [isLoadingLayout, isLoading, data]);

  return (
    <>
      <Navigation />
      {isLoading || isLoadingLayout ? (
        <LoadingGetData />
      ) : (
        <GridLayout
          className="layout pointer-events-none"
          layout={layout}
          cols={12}
          rowHeight={100}
          width={1850}
          isDraggable={false}
          isResizable={false}
        >
          {layout?.map((item, i: number) => (
            <div
              data-grid={layout[i]}
              className={`group relative overflow-hidden h-full w-full pointer-events-none ${
                item.data.name
                  .toLowerCase()
                  .includes(searchDashboard.toLowerCase())
                  ? ""
                  : "hidden"
              }`}
              key={i}
            >
              {/* IFRAME as background */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-auto">
                <iframe
                  src={`${MEDIAMTX_URL}/${item.data.path_slug}`}
                  allow="fullscreen; autoplay; encrypted-media"
                  className="w-full h-full pointer-events-auto border-none"
                  title={item.data.path_slug}
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
              <div className="relative h-full border border-dark-ocean z-20 pointer-events-none">
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {item.data.name}
                </div>

                <div className="absolute bottom-9 right-3 flex flex-col gap-1 z-30 pointer-events-auto">
                  <RecordingCamera
                    key={i}
                    pathSlug={item.data.path_slug}
                    rtspUrl={`rtsp://192.168.100.10:8554/${item.data.path_slug}`}
                    outputPath={`/recordings/${item.data.path_slug}`}
                  />
                  <Link
                    href={`/cctv/${item.data.id}`}
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
