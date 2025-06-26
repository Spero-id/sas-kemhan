"use client";

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import FilterNavigation from "@/components/Navigation/Filter";
import { FaMap } from "react-icons/fa";
import { useDetailCctv } from "@/services/api/cctv/get/get.hooks";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import StreamCard from "@/components/StreamCard";
import PartialsBodyWorm from "@/components/Partials/body-worm";
import PartialsHelmet from "@/components/Partials/helmet";
import PartialsCctv from "@/components/Partials/cctv";

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
        <div className="relative h-[28.5rem] h-">
          {data && (
            <StreamCard
              path_slug={data?.data?.path_slug ?? ""}
              name={data?.data?.name ?? ""}
              redirect="/"
              type={1}
              star={data?.data?.star}
            />
          )}
        </div>
        <div className="mt-5 gap-3">
          <PartialsCctv classParent="flex gap-3" classStream="h-36" />
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
              <Link href="/" className="text-lg">
                Lainnya
              </Link>
            </div>
          </div>
          <span className="h-12 w-[2px] bg-cyan-neon"></span>
          <div className="w-1/2">
            <FilterNavigation
              urlManage="/manage/cctv"
              permissionManage="cctv.view"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-1/2 mt-2">
            <div className="flex justify-between items-center mb-2">
              <p className="text-yellow-400 font-semibold text-lg">Body Worm</p>
              <Link href="/body-worm" className="text-white text-lg">
                Lainnya
              </Link>
            </div>
            <div className="mt-2">
              <PartialsBodyWorm
                classParent="flex flex-col gap-3"
                classStream="h-48"
              />
            </div>
          </div>
          <div className="w-1/2 mt-2">
            <div className="flex justify-between items-center mb-2">
              <p className="text-yellow-400 font-semibold text-lg">Helmet</p>
              <Link href="/helmet" className="text-white text-lg">
                Lainnya
              </Link>
            </div>
            <div className="mt-2">
              <PartialsHelmet
                classParent="flex flex-col gap-3"
                classStream="h-48"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
