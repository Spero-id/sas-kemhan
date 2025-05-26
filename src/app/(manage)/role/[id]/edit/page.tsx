"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormEditUser from "@/module/user/Form/FormEdit";

export default function EditUser({ params }: Readonly<{ params: { id: string } }>) {
  const id = params.id;
  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Edit User"
        linkPrevious={[
          { href: "/user", name: "User / " },
          { href: "/user/edit", name: "Edit", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Edit User</h5>
        <FormEditUser id={id}></FormEditUser>
      </div>
    </div>
  );
}
