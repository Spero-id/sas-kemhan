"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormPostUser from "@/module/user/Form/FormPost";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateUser() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !hasPermission(data?.user, "user.create")) {
      router.push("/");
    }
  }, [status]);

  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Create User"
        linkPrevious={[
          { href: "/user", name: "User / " },
          { href: "/user/create", name: "Create", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Create User</h5>
        <FormPostUser></FormPostUser>
      </div>
    </div>
  );
}
