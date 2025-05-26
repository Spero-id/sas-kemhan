"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormPostUser from "@/module/user/Form/FormPost";

export default function CreateUser() {
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
