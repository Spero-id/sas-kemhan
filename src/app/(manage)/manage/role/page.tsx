"use client";

import TableRole from "@/module/role/TableRole";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Role() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "role.view")
    ) {
      router.push("/");
    }
  }, [status, data]);

  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-slate-600">Role</h5>
          {status === "authenticated" &&
            hasPermission(data?.user, "role.create") && (
              <Link href={"/manage/role/create"} className="btn">
                Create
              </Link>
            )}
        </div>
        <TableRole />
      </div>
    </div>
  );
}
