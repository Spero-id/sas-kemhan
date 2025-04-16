"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormPostCCTV from "@/module/cctv/Form/FormPost";

export default function CreateCCTV() {
  return (
    <div className="container mx-auto mt-5">
      <Breadcrumb
        pageName="Create CCTV"
        linkPrevious={[
          { href: "/cctv", name: "CCTV / " },
          { href: "/cctv/create", name: "Create", active: true },
        ]}
      />

      <div className="w-full shadow rounded bg-white p-6">
        <h5 className="text-xl font-bold text-slate-600 mb-2">Create CCTV</h5>
        <FormPostCCTV></FormPostCCTV>
      </div>
    </div>
  );
}
