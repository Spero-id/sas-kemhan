"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormPostCctv from "@/module/cctv/Form/FormPost";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateCctv() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "cctv.create")
    ) {
      router.push("/");
    }
  }, [status, data, router]);

  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Create CCTV"
        linkPrevious={[
          { href: "/manage/cctv", name: "CCTV / " },
          { href: "/manage/cctv/create", name: "Create", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Create CCTV</h5>
        <FormPostCctv></FormPostCctv>
      </div>
    </div>
  );
}
