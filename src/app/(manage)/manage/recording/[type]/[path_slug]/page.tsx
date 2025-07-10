"use client";

import TableListRecording from "@/module/recording/TableListRecording";
import { useGetSpaceDisk } from "@/services/api/disk/get/get.hooks";
import Link from "next/link";
import { useEffect } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function Recording({
  params,
}: Readonly<{ params: { type: string; path_slug: string } }>) {

  const { isLoading: isLoadingSpaceDisk, data: dataSpaceDisk } = useGetSpaceDisk();

  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={`/manage/${params.type}`}>
              <MdOutlineKeyboardArrowLeft className="text-2xl text-slate-600" /> 
            </Link>
            <h5 className="text-xl font-bold text-slate-600">List recording ({params.path_slug})</h5>
          </div>
          {!isLoadingSpaceDisk && (
            <p className="text text-slate-600 font-bold">
              Disk: {dataSpaceDisk?.usage}
            </p>
          )}
        </div>

        <TableListRecording path_slug={params.path_slug} />
      </div>
    </div>
  );
}