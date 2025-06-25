"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormEditHelmet from "@/module/helmet/Form/FormEdit";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditHelmet({
  params,
}: Readonly<{ params: { id: string } }>) {
  const id = params.id;

  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "helmet.update")
    ) {
      router.push("/");
    }
  }, [status, data, router]);
  
  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Edit Helmet"
        linkPrevious={[
          { href: "/manage/helmet", name: "Helmet / " },
          { href: "/manage/helmet/edit", name: "Edit", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Edit Helmet</h5>
        <FormEditHelmet id={id}></FormEditHelmet>
      </div>
    </div>
  );
}
