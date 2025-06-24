"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormEditCctv from "@/module/cctv/Form/FormEdit";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditCctv({
  params,
}: Readonly<{ params: { id: string } }>) {
  const id = params.id;

  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "cctv.update")
    ) {
      router.push("/");
    }
  }, [status, data, router]);
  
  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Edit Cctv"
        linkPrevious={[
          { href: "/manage/cctv", name: "CCTV / " },
          { href: "/manage/cctv/edit", name: "Edit", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Edit CCTV</h5>
        <FormEditCctv id={id}></FormEditCctv>
      </div>
    </div>
  );
}
