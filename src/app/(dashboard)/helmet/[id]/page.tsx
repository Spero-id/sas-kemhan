"use client";

import Link from "next/link";
import FilterNavigation from "@/components/Navigation/Filter";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import StreamCard from "@/components/StreamCard";
import PartialsBodyWorm from "@/components/Partials/body-worm";
import PartialsHelmet from "@/components/Partials/helmet";
import PartialsCctv from "@/components/Partials/cctv";
import { useDetailHelmet } from "@/services/api/helmet/get/get.hooks";

export default function DetailHelmet({
  params,
}: Readonly<{ params: { id: string } }>) {
  const id = params.id;

  const { data, isLoading } = useDetailHelmet({ id });

  if (isLoading) return <LoadingGetData />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <div className="relative h-[28.5rem]">
          {data && (
            <StreamCard
              path_slug={data?.data?.path_slug ?? ""}
              name={data?.data?.name ?? ""}
              redirect="/"
              type={2}
              star={data?.data?.star ?? false}
            />
          )}
        </div>
        <div className="mt-4 gap-3">
          <PartialsHelmet
            classParent="flex gap-3"
            classStream="h-56"
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between gap-4">
          <div className="flex items-center justify-between w-1/2">
            <p className="text-yellow-400 font-semibold text-lg">Helmet</p>
            <div className="flex text-white gap-1">
              <Link href="/helmet">Lainnya</Link>
            </div>
          </div>
          <span className="h-12 w-[2px] bg-cyan-neon"></span>
          <div className="w-1/2">
            <FilterNavigation urlManage="/manage/helmet" permissionManage="helmet.view" />
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
              <p className="text-yellow-400 font-semibold text-lg">CCTV</p>
              <Link href="/" className="text-white text-lg">
                Lainnya
              </Link>
            </div>
            <PartialsCctv
              classParent="flex flex-col gap-4"
              classStream="h-48"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
