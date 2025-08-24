"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormPostBodyWorm from "@/module/body_worm/Form/FormPost";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateBodyWorm() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "body_worm.create")
    ) {
      router.push("/");
    }
  }, [status, data, router]);

  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Create Body Worm"
        linkPrevious={[
          { href: "/manage/body-worm", name: "Body Worm / " },
          { href: "/manage/body-worm/create", name: "Create", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Create Body Worm</h5>
        <FormPostBodyWorm></FormPostBodyWorm>
      </div>
    </div>
  );
}
