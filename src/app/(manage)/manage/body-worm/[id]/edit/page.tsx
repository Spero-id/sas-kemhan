"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormEditBodyWorm from "@/module/body_worm/Form/FormEdit";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditBodyWorm({
  params,
}: Readonly<{ params: { id: string } }>) {
  const id = params.id;

  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "body_worm.update")
    ) {
      router.push("/");
    }
  }, [status, data, router]);
  
  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Edit Body Worm"
        linkPrevious={[
          { href: "/manage/body-worm", name: "Body Worm / " },
          { href: "/manage/body-worm/edit", name: "Edit", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Edit Body Worm</h5>
        <FormEditBodyWorm id={id}></FormEditBodyWorm>
      </div>
    </div>
  );
}
