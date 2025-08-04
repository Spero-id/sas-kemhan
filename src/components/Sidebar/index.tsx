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
        {hasPermission(data?.user, "cctv.view") && (
          <li>
            <Link
              href="/manage/cctv"
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                pathname?.includes("cctv") && "bg-graydark dark:bg-meta-4"
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
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                pathname?.includes("helmet") && "bg-graydark dark:bg-meta-4"
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
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                pathname?.includes("body_worm") && "bg-graydark dark:bg-meta-4"
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
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                pathname?.includes("user") && "bg-graydark dark:bg-meta-4"
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
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                pathname?.includes("role") && "bg-graydark dark:bg-meta-4"
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
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                pathname?.includes("layout") && "bg-graydark dark:bg-meta-4"
              }`}
            >
              Layout
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
