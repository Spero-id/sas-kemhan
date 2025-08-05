"use client";

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import DetailFilterNavigation from "@/components/Navigation/DetailFilter";
import { FaMap } from "react-icons/fa";
import { useDetailCctv } from "@/services/api/cctv/get/get.hooks";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import StreamCard from "@/components/StreamCard";
import PartialsBodyWorm from "@/components/Partials/body-worm";
import PartialsHelmet from "@/components/Partials/helmet";
import PartialsCctv from "@/components/Partials/cctv";
import MapComponent from "@/components/Map";
import { useAllCctv } from "@/services/api/cctv/get/get.hooks";


const MEDIAMTX_RTSP = process.env.NEXT_PUBLIC_MEDIAMTX_RTSP;

export default function DetailCctv({
  params,
}: Readonly<{ params: { id: string } }>) {
  const id = params.id;

  const { data, isLoading } = useDetailCctv({ id });
  const { isLoading: isLoadingMarker, data: dataMarker } = useAllCctv();

  if (isLoading || isLoadingMarker || !dataMarker) {
    return <LoadingGetData />;
  }


  return (
    <div>
      <div className="py-3">
        <DetailFilterNavigation backURL="/" urlManage="/manage/body-worm" permissionManage="body_worm.view" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

        <div>
          <div className="relative h-[28.5rem] h-">
            {data && (
              <StreamCard
                path_slug={data?.data?.path_slug ?? ""}
                name={data?.data?.name ?? ""}
                redirect="/"
                type={1}
                star={data?.data?.star}
                pin={true}
              />
            )}
          </div>
          <div className="mt-5 gap-3">

            <PartialsCctv classParent="grid grid-cols-3 gap-3" classStream="h-36" />
          </div>

        </div>
        <div>

          <div className="relative h-[28.5rem] h-">
            {/* Fullscreen icon pojok kanan atas */}
            <Link href="/peta" target="_blank" rel="noopener noreferrer">
              <button
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
                title="Fullscreen Map"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                </svg>
              </button>
            </Link>

            {isLoadingMarker ? (
              <p>Loading map...</p>
            ) : (
              <MapComponent data={dataMarker} />
            )}
          </div>
          <div className="mt-5 gap-3">

            <PartialsBodyWorm classParent="grid grid-cols-3 gap-3" classStream="h-36" />
          </div>

        </div>
      </div>
    </div>
  );
}
