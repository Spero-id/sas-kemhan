"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { hasPermission } from "@/utils/permissions";
const Sidebar = () => {
  const pathname = usePathname();
  const { data, status } = useSession();

  return status === "authenticated" && (
    <div className="drawer-side">
      <label
        htmlFor="sidebar"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
         <li>
            <Link
              href="/"
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark 
            >
              Dashboard
            </Link>
          </li>
        {hasPermission(data?.user, "cctv.view") && (
          <li>
            <Link
              href="/manage/cctv"
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${pathname?.includes("cctv") && "bg-graydark "
                }`}
            >
              CCTV
            </Link>
          </li>
        )}
        {hasPermission(data?.user, "helmet.view") && (
          <li>
            <Link
              href="/manage/helmet"
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${pathname?.includes("helmet") && "bg-graydark "
                }`}
            >
              Helmet
            </Link>
          </li>
        )}
        {hasPermission(data?.user, "body_worm.view") && (
          <li>
            <Link
              href="/manage/body-worm"
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${pathname?.includes("body_worm") && "bg-graydark "
                }`}
            >
              Body Worm
            </Link>
          </li>
        )}
        {hasPermission(data?.user, "user.view") && (
          <li>
            <Link
              href="/manage/user"
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${pathname?.includes("user") && "bg-graydark "
                }`}
            >
              User
            </Link>
          </li>
        )}
        {hasPermission(data?.user, "role.view") && (
          <li>
            <Link
              href="/manage/role"
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${pathname?.includes("role") && "bg-graydark "
                }`}
            >
              Role
            </Link>
          </li>
        )}
        {hasPermission(data?.user, "layout.view") && (
          <li>
            <Link
              href="/manage/layout"
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${pathname?.includes("layout") && "bg-graydark "
                }`}
            >
              Layout
            </Link>
          </li>
        )}
        {hasPermission(data?.user, "region.view") && (
          <li>
            <Link
              href="/manage/region"
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${pathname?.includes("layout") && "bg-graydark "
                }`}
            >
              Region
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
