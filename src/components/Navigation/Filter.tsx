'use client';

import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { useAtom } from "jotai";
import {
  searchDashboardAtom,
} from "@/common/module/SettingsJotai";
import Link from "next/link";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import RegionSelector from "./RegionSelector";

export default function FilterNavigation({
  urlManage,
  permissionManage
}: Readonly<{ urlManage: string; permissionManage: string }>) {
  const [, setsearchDashboardAtom] = useAtom(searchDashboardAtom);
  const { data, status } = useSession();
  return status === "authenticated" && (
    <div className="flex gap-3 justify-end">
      <label className="input input-bordered flex items-center gap-2 bg-deep-teal bg-opacity-50 rounded text-white">
        <input
          type="text"
          className="grow"
          placeholder="Cari"
          onChange={(e) => setsearchDashboardAtom(e.target.value)}
        />
        <CiSearch />
      </label>
      <RegionSelector />
      {hasPermission(data?.user, permissionManage) && (
        <Link
          className="bg-deep-teal bg-opacity-50 rounded text-white flex items-center justify-center p-3"
          href={urlManage}
        >
          <Image src="/icons/filter.svg" alt="filter" width={25} height={25} />
        </Link>
      )}
    </div>
  );
}
