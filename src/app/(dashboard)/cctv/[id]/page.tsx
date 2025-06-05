"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IoMdQrScanner,
  IoIosArrowDropleft,
  IoIosArrowDropright,
} from "react-icons/io";
import { MdPushPin, MdDashboard } from "react-icons/md";
import { TfiTarget } from "react-icons/tfi";
import FilterNavigation from "@/components/Navigation/Filter";
import { FaMap } from "react-icons/fa";
import { useDetailCctv } from "@/services/api/cctv/get/get.hooks";
import RecordingCamera from "@/components/RecordingCamera";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import StreamCard from "@/components/StreamCard";
import PartialsBodyWorm from "@/components/Partials/body-worm";
import PartialsHelmet from "@/components/Partials/helmet";

const MEDIAMTX_RTSP = process.env.NEXT_PUBLIC_MEDIAMTX_RTSP;

export default function DetailCctv({
  params,
}: Readonly<{ params: { id: string } }>) {
  const id = params.id;

  const { data, isLoading } = useDetailCctv({ id });

  if (isLoading) return <LoadingGetData />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <div className="relative h-[28.5rem]">
          <StreamCard
            path_slug={data?.data?.path_slug ?? ""}
            name={data?.data?.name ?? ""}
            redirect="/"
          />
        </div>
        <div className="grid grid-cols-3 h-36 mt-5 gap-3">
          {[1, 2, 3].map((item) => (
            <div className={`group relative overflow-hidden`} key={item}>
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
              <div className="relative h-full border border-dark-ocean">
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  John doe - CCTV
                </div>

                <div className="absolute bottom-3 right-2 flex flex-col gap-1 z-20">
                  <RecordingCamera
                    pathSlug={data?.data.path_slug ?? ""}
                    rtspUrl={`rtsp://${MEDIAMTX_RTSP}:8554/${data?.data.path_slug}`}
                    outputPath={`/recordings/${data?.data.path_slug}`}
                  />
                  <Link
                    href={`/cctv/`}
                    className="p-1 rounded text-white text-lg cursor-pointer"
                  >
                    <MdPushPin />
                  </Link>
                  <button className="p-1 rounded text-white text-lg">
                    <IoMdQrScanner />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          <Link
            href="/"
            className="w-1/2 bg-deep-teal bg-opacity-50 border border-white border-opacity-30 h-16 flex items-center justify-center text-cyan-neon text-lg gap-1 rounded-md"
          >
            <MdDashboard className="text-red-700 text-2xl" /> Tata Letak
          </Link>
          <Link
            href="/peta"
            className="w-1/2 bg-deep-teal bg-opacity-50 border border-white border-opacity-30 h-16 flex items-center justify-center text-cyan-neon text-lg gap-1 rounded-md"
          >
            <FaMap className="text-red-700 text-2xl" /> Tampilkan Peta
          </Link>
        </div>
      </div>
      <div>
        <div className="flex justify-between gap-4">
          <div className="flex items-center justify-between w-1/2">
            <p className="text-yellow-400 font-semibold text-lg">CCTV</p>
            <div className="flex text-white gap-1">
              <Link href="/">Lainnya</Link>
            </div>
          </div>
          <span className="h-12 w-[2px] bg-cyan-neon"></span>
          <div className="w-1/2">
            <FilterNavigation />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-1/2">
            <PartialsBodyWorm limit={3} />
          </div>
          <div className="w-1/2">
            <PartialsHelmet limit={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
