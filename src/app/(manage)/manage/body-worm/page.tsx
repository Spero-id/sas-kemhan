"use client";

import ButtonGenerateMediaMTX from "@/components/GenerateMediaMTX";
import TableBodyWorm from "@/module/body_worm/TableBodyWorm";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BodyWorm() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !hasPermission(data?.user, "body_worm.view")) {
      router.push("/");
    }
  }, [status, data, router]);

  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-slate-600">Body Worm</h5>
          <div className="flex gap-3">
            <ButtonGenerateMediaMTX />
            {status === "authenticated" &&
              hasPermission(data?.user, "body_worm.create") && (
                <Link href={"/manage/body-worm/create"} className="btn">
                  Create
                </Link>
              )}
          </div>
        </div>
        <TableBodyWorm />
      </div>
    </div>
  );
}
