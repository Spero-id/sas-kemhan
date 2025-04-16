"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormEditCCTV from "@/module/cctv/Form/FormEdit";

export default function EditCCTV({ params }: Readonly<{ params: { id: string } }>) {
  const id = params.id;
  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Edit CCTV"
        linkPrevious={[
          { href: "/cctv", name: "CCTV / " },
          { href: "/cctv/edit", name: "Edit", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Edit CCTV</h5>
        <FormEditCCTV id={id}></FormEditCCTV>
      </div>
    </div>
  );
}
