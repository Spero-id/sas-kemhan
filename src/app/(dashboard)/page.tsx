"use client";

import { searchDashboardAtom } from "@/common/module/SettingsJotai";
import HLSPlayer from "@/components/HLSPlayer";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import Navigation from "@/components/Navigation/Navigation";
import { useAllCctv } from "@/services/api/cctv/get/get.hooks";
import { Cctv } from "@/types/Cctv/TypeCctv";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { IoMdQrScanner } from "react-icons/io";
import { MdPushPin } from "react-icons/md";
import { TfiTarget } from "react-icons/tfi";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Home() {
  const [searchDashboard] = useAtom(searchDashboardAtom);
  const { isLoading, data } = useAllCctv();

  return (
    <>
      <Navigation />
      {isLoading ? (
        <LoadingGetData />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-h-[70vh] overflow-auto">
          {data?.data.map((item: Cctv, i: number) => (
            <div
              className={`group relative overflow-hidden h-56 ${
                item.name.toLowerCase().includes(searchDashboard.toLowerCase())
                  ? ""
                  : "hidden"
              }`}
              key={i}>
              {/* <Image
                src=""
                alt="CCTV"
                className=" h-auto"
                width={300}
                height={200}
              /> */}
              <Image src="/images/frame.png" alt="frame" fill className="z-10 pointer-events-none group-hover:hidden" />
              <Image src="/images/frame-active.png" alt="frame-active" fill className="z-10 pointer-events-none hidden group-hover:block" />
              <div className="relative h-full border border-dark-ocean">
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {item.name}
                </div>

                {item.status ? (
                  <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-green-400 text-xs font-bold px-2 py-1 rounded">
                    ● ONLINE
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-red-400 text-xs font-bold px-2 py-1 rounded">
                    ● OFFLINE
                  </div>
                )}

                <div className="absolute top-10 left-3 text-white text-sm">
                  00:15:145
                </div>

                <div className="absolute bottom-3 right-2 flex flex-col gap-1 z-20">
                  <button className="p-1 rounded text-white text-lg">
                    <TfiTarget />
                  </button>
                  <Link href={`/cctv/${item.user_id}`} className="p-1 rounded text-white text-lg">
                    <MdPushPin />
                  </Link>
                  <button className="p-1 rounded text-white text-lg">
                    <IoMdQrScanner />
                  </button>
                </div>

                <div className="absolute bottom-3 left-12 text-white text-sm">
                  <div className="font-bold">John Doe</div>
                  <div className="text-xs">12/02/2025, 07:45</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <HLSPlayer src="http://localhost:8888/live/stream/index.m3u8" />
    </>
  );
}
