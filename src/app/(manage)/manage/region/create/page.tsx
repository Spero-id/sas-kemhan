"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormPostRegion from "@/module/region/Form/FormPost";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateRegion() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "region.create")
    ) {
      router.push("/");
    }
  }, [status, data, router]);

  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Create Region"
        linkPrevious={[
          { href: "/manage/region", name: "Region / " },
          { href: "/manage/region/create", name: "Create", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Create Region</h5>
        <FormPostRegion></FormPostRegion>
      </div>
    </div>
  );
}
