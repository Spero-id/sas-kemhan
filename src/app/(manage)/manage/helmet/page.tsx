"use client";

import ButtonGenerateMediaMTX from "@/components/GenerateMediaMTX";
import TableHelmet from "@/module/helmet/TableHelmet";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Helmet() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !hasPermission(data?.user, "helmet.view")) {
      router.push("/");
    }
  }, [status, data, router]);

  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-slate-600">Helmet</h5>
          <div className="flex gap-3">
            <ButtonGenerateMediaMTX />
            {status === "authenticated" &&
              hasPermission(data?.user, "helmet.create") && (
                <Link href={"/manage/helmet/create"} className="btn">
                  Create
                </Link>
              )}
          </div>
        </div>
        <TableHelmet />
      </div>
    </div>
  );
}
