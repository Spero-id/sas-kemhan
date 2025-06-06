"use client";

import TableLayout from "@/module/layout/TableLayout";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "layout.view")
    ) {
      router.push("/");
    }
  }, [status, data]);

  return (
    <div className="container mt-5 mx-auto">
      <div className="w-full shadow rounded bg-white p-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-slate-600">Layout</h5>
        </div>
        <TableLayout />
      </div>
    </div>
  );
}
