"use client";

import ButtonGenerateMediaMTX from "@/components/GenerateMediaMTX";
import TableCctv from "@/module/cctv/TableCctv";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Cctv() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !hasPermission(data?.user, "cctv.view")) {
      router.push("/");
    }
  }, [status, data, router]);

  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-slate-600">CCTV</h5>
          <div className="flex gap-3">
            <ButtonGenerateMediaMTX />
            {status === "authenticated" &&
              hasPermission(data?.user, "cctv.create") && (
                <Link href={"/manage/cctv/create"} className="btn">
                  Create
                </Link>
              )}
          </div>
        </div>
        <TableCctv />
      </div>
    </div>
  );
}
