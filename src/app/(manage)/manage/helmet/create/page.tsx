"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormPostHelmet from "@/module/helmet/Form/FormPost";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateHelmet() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "helmet.create")
    ) {
      router.push("/");
    }
  }, [status, data, router]);

  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Create Helmet"
        linkPrevious={[
          { href: "/manage/helmet", name: "Helmet / " },
          { href: "/manage/helmet/create", name: "Create", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Create Helmet</h5>
        <FormPostHelmet></FormPostHelmet>
      </div>
    </div>
  );
}
