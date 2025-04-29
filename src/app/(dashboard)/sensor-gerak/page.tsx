"use client";

import { searchDashboardAtom } from "@/common/module/SettingsJotai";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import { useAllSensorGerak } from "@/services/api/sensor_gerak/get/get.hooks";
import { useAtom } from "jotai";
import Image from "next/image";

export default function SensorGerak() {
  const [searchDashboard] = useAtom(searchDashboardAtom);
  const { isLoading, data } = useAllSensorGerak();

  return (
    <>
      {isLoading ? (
        <LoadingGetData />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 h-[70vh]">
          {data?.data.map((item: any, i: number) => (
            <div
              className={`bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center text-white border-2 border-cyan-400 h-48 ${
                item.name.toLowerCase().includes(searchDashboard.toLowerCase())
                  ? ""
                  : "hidden"
              }`}
              key={i}
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
                {item.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
