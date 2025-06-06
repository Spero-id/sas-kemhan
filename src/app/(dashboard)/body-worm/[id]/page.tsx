"use client";

import Link from "next/link";
import FilterNavigation from "@/components/Navigation/Filter";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import StreamCard from "@/components/StreamCard";
import PartialsHelmet from "@/components/Partials/helmet";
import PartialsCctv from "@/components/Partials/cctv";
import PartialsBodyWorm from "@/components/Partials/body-worm";
import { useDetailBodyWorm } from "@/services/api/body_worm/get/get.hooks";

export default function DetailBodyWorm({
  params,
}: Readonly<{ params: { id: string } }>) {
  const id = params.id;

  const { data, isLoading } = useDetailBodyWorm({ id });

  if (isLoading) return <LoadingGetData />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <div className="relative h-[28.5rem] h-">
          <StreamCard
            path_slug={data?.data?.path_slug ?? ""}
            name={data?.data?.name ?? ""}
            redirect="/"
          />
        </div>
        <div className="mt-4 gap-3">
          <PartialsBodyWorm
            limit={3}
            classParent="flex gap-3"
            classStream="h-56"
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between gap-4">
          <div className="flex items-center justify-between w-1/2">
            <p className="text-yellow-400 font-semibold text-lg">Body Worm</p>
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
            <div className="flex justify-between items-center mb-2">
              <p className="text-yellow-400 font-semibold text-lg">CCTV</p>
              <Link href="/" className="text-white text-lg">
                Lainnya
              </Link>
            </div>
            <PartialsCctv
              limit={3}
              classParent="flex flex-col gap-4"
              classStream="h-48"
            />
          </div>
          <div className="w-1/2">
            <div className="flex justify-between items-center mb-2">
              <p className="text-yellow-400 font-semibold text-lg">Helmet</p>
              <Link href="/helmet" className="text-white text-lg">
                Lainnya
              </Link>
            </div>
            <div className="mt-2">
              <PartialsHelmet
                limit={3}
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
