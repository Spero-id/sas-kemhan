"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormPostGalery from "@/module/user/Form/FormPost";

export default function CreateGalery() {
  return (
    <>
      <Breadcrumb
        pageName="Create Galery"
        linkPrevious={[
          { href: "/galery", name: "Galery / " },
          { href: "/galery/create", name: "Create", active: true },
        ]}
      />

      <div className="p-4 w-full bg-white rounded">
        <FormPostGalery></FormPostGalery>
      </div>
    </>
  );
}
