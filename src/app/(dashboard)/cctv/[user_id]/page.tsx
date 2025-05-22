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
import HLSPlayer from "@/components/HLSPlayer";

const MEDIAMTX_URL = process.env.NEXT_PUBLIC_MEDIAMTX_URL;

export default function DetailCctv({
  params,
}: Readonly<{ params: { user_id: string } }>) {
  const id = params.user_id;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <div className="relative h-[28.5rem]">
          <HLSPlayer src={`${MEDIAMTX_URL}/camera${id}/index.m3u8`} />
          <Image
            src="/images/frame-detail.png"
            alt="frame-detail"
            fill
            className="z-10 pointer-events-none"
          />
          <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded text-base">
            John Doe - CCTV 1
          </div>
          <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-1 rounded text-base">
            ONLINE
          </div>

          <div className="absolute top-14 left-4 text-white text-base">
            00:15:145
          </div>

          <div className="absolute bottom-4 right-4 flex flex-col gap-1 z-20">
            <button className="p-1 rounded text-white text-2xl">
              <TfiTarget />
            </button>
            <Link
              href={`/cctv`}
              className="p-1 rounded text-yellow-500 text-2xl"
            >
              <MdPushPin />
            </Link>
            <button className="p-1 rounded text-white text-2xl">
              <IoMdQrScanner />
            </button>
          </div>
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
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  John doe - CCTV
                </div>

                {true ? (
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
                  <Link
                    href={`/cctv/`}
                    className="p-1 rounded text-white text-lg"
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
              <IoIosArrowDropleft className="text-2xl" />
              <IoIosArrowDropright className="text-2xl" />
            </div>
          </div>
          <span className="h-12 w-[2px] bg-cyan-neon"></span>
          <div className="w-1/2">
            <FilterNavigation />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[1, 2, 3, 4].map((item) => (
            <div className={`group relative overflow-hidden h-48`} key={item}>
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
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  John doe - CCTV
                </div>

                {true ? (
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
                  <Link
                    href={`/cctv/`}
                    className="p-1 rounded text-white text-lg"
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
        <div className="flex justify-between mt-3 mb-2">
          <div className="flex items-center justify-between w-full">
            <p className="text-yellow-400 font-semibold text-lg">
              Sensor Gerak
            </p>
            <div className="flex text-white gap-1">
              <Link href="/">Lainnya</Link>
              <IoIosArrowDropleft className="text-2xl" />
              <IoIosArrowDropright className="text-2xl" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 h-36 gap-3">
          {[1, 2, 3].map((item) => (
            <div
              className={`bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center text-white border-2 border-cyan-400 h-48`}
              key={item}
            >
              <div className="text-red-500 text-4xl">
                <Image
                  src={"/icons/sensor.svg"}
                  alt="Sensor"
                  width={80}
                  height={80}
                  className="fill-red-700"
                />
              </div>
              <div className="mt-2 bg-yellow-500 text-black px-2 py-1 rounded">
                test
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
