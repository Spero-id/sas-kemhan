"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormPostRole from "@/module/role/Form/FormPost";

export default function CreateRole() {
  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Create Role"
        linkPrevious={[
          { href: "/role", name: "Role / " },
          { href: "/role/create", name: "Create", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Create Role</h5>
        <FormPostRole></FormPostRole>
      </div>
    </div>
  );
}
