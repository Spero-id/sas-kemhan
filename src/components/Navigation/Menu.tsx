"use client";

import Link from "next/link";
import { TbDeviceCctvFilled } from "react-icons/tb";
import { MdCamera, MdSensorOccupied } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingGetData from "../Loading/LoadingGetData";
import { hasPermission } from "@/utils/permissions";

export default function MenuNavigation() {
  const { data, status } = useSession();
  const pathname = usePathname();
  
  return status !== "authenticated" ? (
    <LoadingGetData />
  ) : (
    <div className="flex gap-3">
      {hasPermission(data?.user, "dashboard.cctv.view") && (
        <Link
          href="/"
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border ${
            pathname === "/"
              ? "border-cyan-neon"
              : "border-transparent opacity-50"
          }`}
        >
          <TbDeviceCctvFilled />
          CCTV
        </Link>
      )}
      {hasPermission(data?.user, "dashboard.sensor.view") && (
        <Link
          href="/sensor"
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border ${
            pathname?.includes("sensor")
              ? "border-cyan-neon"
              : "border-transparent opacity-50"
          }`}
        >
          <MdSensorOccupied />
          Sensor
        </Link>
      )}
      {hasPermission(data?.user, "dashboard.body_worm.view") && (
        <Link
          href="/body-worn"
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border ${
            pathname?.includes("body-worn")
              ? "border-cyan-neon"
              : "border-transparent opacity-50"
          }`}
        >
          <MdCamera />
          Body-Worn Camera
        </Link>
      )}
      {hasPermission(data?.user, "dashboard.helmet.view") && (
        <Link
          href="/helmet"
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border ${
            pathname?.includes("helmet")
              ? "border-cyan-neon"
              : "border-transparent opacity-50"
          }`}
        >
          <MdCamera />
          Helmet
        </Link>
      )}
      <Link
        href="#"
        className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border ${
          pathname?.includes("other")
            ? "border-cyan-neon"
            : "border-transparent opacity-50"
        }`}
      >
        <MdCamera />
        Other
      </Link>
    </div>
  );
}
