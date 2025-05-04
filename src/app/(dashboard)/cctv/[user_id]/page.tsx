"use client";

import Navigation from "@/components/Navigation/Navigation";
import Image from "next/image";
import Link from "next/link";
import { IoMdQrScanner } from "react-icons/io";
import { MdPushPin } from "react-icons/md";
import { TfiTarget } from "react-icons/tfi";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

export default function DetailCctv() {
  return (
    <>
      <Navigation />
      <div className="grid grid-cols-4 gap-4 text-white font-sans">
        <div className="col-span-2 overflow-hidden relative">
          <div className="relative h-[28.5rem]">
            <Image
              src="/images/frame-detail.png"
              alt="frame-detail"
              fill
              className="z-10 pointer-events-none"
            />
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
              CCTV 1
            </div>
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
              ONLINE
            </div>
            <div className="absolute bottom-4 left-24 text-sm">
              <div className="font-semibold text-lg">John Doe</div>
              <div className="text-xs">12/02/2025, 07:45</div>
            </div>
          </div>
          <div className="grid grid-cols-3 h-48 mt-5 gap-3">
            {[1, 2, 3].map((item) => (
              <div className="relative" key={item}>
                <Image
                  src="/images/frame-detail.png"
                  alt="frame-detail"
                  fill
                  className="z-10 pointer-events-none"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                  CCTV 1
                </div>
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                  ONLINE
                </div>
                <div className="absolute bottom-4 left-24 text-sm">
                  <div className="font-semibold text-lg">John Doe</div>
                  <div className="text-xs">12/02/2025, 07:45</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div className={`group relative overflow-hidden h-56`} key={item}>
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
                    CCTV
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

                  <div className="absolute bottom-3 left-12 text-white text-sm">
                    <div className="font-bold">John Doe</div>
                    <div className="text-xs">12/02/2025, 07:45</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-3 mb-1">
            <p className="text-lg text-yellow-500 font-semibold">
              Sensor Gerak
            </p>
            <div className="flex gap-3 items-center text-lg">
              Lainnya
              <FaRegArrowAltCircleLeft />
              <FaRegArrowAltCircleRight />
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
    </>
  );
}
