"use client";

import Link from "next/link";
import { TbDeviceCctvFilled } from "react-icons/tb";
import { MdCamera } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { hasPermission } from "@/utils/permissions";
import RegionSelector from "./RegionSelector";

export default function MenuNavigation() {
  const { data, status } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Function to preserve query parameters
  const buildHrefWithQuery = (basePath: string) => {
    const queryString = searchParams?.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  return status !== "authenticated" ? (
    <p>Loading ..</p>
  ) : (
    <div className="flex gap-3 items-center">
      {hasPermission(data?.user, "dashboard.cctv.view") && (
        <Link
          href={buildHrefWithQuery("/")}
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg md:text-lg text-sm border w-auto ${pathname === "/"
            ? "border-cyan-neon"
            : "border-transparent opacity-50"
            }`}
        >
          <TbDeviceCctvFilled />
          CCTV
        </Link>
      )}
      {hasPermission(data?.user, "dashboard.body_worm.view") && (
        <Link
          href={buildHrefWithQuery("/body-worm")}
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg md:text-lg text-sm border w-auto whitespace-nowrap ${pathname?.includes("body-worm")
            ? "border-cyan-neon"
            : "border-transparent opacity-50"
            }`}
        >
          <MdCamera />
          Body-Worm Camera
        </Link>
      )}
      {hasPermission(data?.user, "dashboard.helmet.view") && (
        <Link
          href="/helmet"
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg md:text-lg text-sm border w-auto ${pathname?.includes("helmet")
            ? "border-cyan-neon"
            : "border-transparent opacity-50"
            }`}
        >
          <MdCamera />
          Helmet
        </Link>
      )}

      {/* <Link
        href="#"
        className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border ${pathname?.includes("other")
          ? "border-cyan-neon"
          : "border-transparent opacity-50"
          }`}
      >
        <MdCamera />
        Other
      </Link> */}

    </div>
  );
}
