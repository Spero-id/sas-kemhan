'use client';

import { CiSearch, CiSquareChevLeft } from "react-icons/ci";
import Image from "next/image";
import { useAtom } from "jotai";
import {
  searchDashboardAtom,
} from "@/common/module/SettingsJotai";
import Link from "next/link";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { BsArrowBarLeft } from "react-icons/bs";
import { FaCaretLeft } from "react-icons/fa";

export default function DetailFilterNavigation({
  urlManage,
  permissionManage
}: Readonly<{ urlManage: string; permissionManage: string }>) {
  const [, setsearchDashboardAtom] = useAtom(searchDashboardAtom);
  const { data, status } = useSession();
  return status === "authenticated" && (
    <div className="flex justify-between pt-3">
      <Link
        className="bg-deep-teal bg-opacity-50 rounded text-white flex items-center justify-center p-3 cursor-pointer"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
      >
        <FaCaretLeft size={24} /> Kembali
      </Link>


      <div className="flex gap-3">
        <label className="input input-bordered flex items-center gap-2 bg-deep-teal bg-opacity-50 rounded text-white">
          <input
            type="text"
            className="grow"
            placeholder="Cari"
            onChange={(e) => setsearchDashboardAtom(e.target.value)}
          />
          <CiSearch />
        </label>

        {hasPermission(data?.user, permissionManage) && (
          <Link
            className="bg-deep-teal bg-opacity-50 rounded text-white flex items-center justify-center p-3"
            href={urlManage}
          >
            <Image src="/icons/filter.svg" alt="filter" width={25} height={25} />
          </Link>
        )}
      </div>

    </div>
  );
}
