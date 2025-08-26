"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormEditRegion from "@/module/region/Form/FormEdit";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditUser({
  params,
}: Readonly<{ params: { id: string } }>) {
  const id = params.id;
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "role.update")
    ) {
      router.push("/");
    }
  }, [status, data, router]);
  
  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Edit Region"
        linkPrevious={[
          { href: "/manage/region", name: "Region / " },
          { href: "/manage/region/edit", name: "Edit", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Edit Region</h5>
        <FormEditRegion id={id}></FormEditRegion>
      </div>
    </div>
  );
}
