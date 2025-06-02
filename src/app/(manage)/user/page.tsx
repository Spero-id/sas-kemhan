"use client";

import ButtonGenerateMediaMTX from "@/components/GenerateMediaMTX";
import TableUser from "@/module/user/TableUser";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function User() {
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && !hasPermission(data?.user, "user.view")) {
      router.push("/");
    }
  }, [status]);

  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-slate-600">User</h5>
          <div className="flex gap-3">
            <ButtonGenerateMediaMTX />
            {status === "authenticated" &&
              hasPermission(data?.user, "user.create") && (
                <Link href={"/user/create"} className="btn">
                  Create
                </Link>
              )}
          </div>
        </div>
        <TableUser />
      </div>
    </div>
  );
}
