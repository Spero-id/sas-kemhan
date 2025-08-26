
"use client";

import TableRegion from "@/module/region/TableRegion";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Region() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "region.view")
    ) {
      router.push("/");
    }
  }, [status, data]);

  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-slate-600">Region</h5>
          {status === "authenticated" &&
            hasPermission(data?.user, "region.create") && (
              <Link href={"/manage/region/create"} className="btn">
                Create
              </Link>
            )}
        </div>
        <TableRegion />
      </div>
    </div>
  );
}
