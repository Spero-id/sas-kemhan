"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormEditGalery from "@/module/user/Form/FormEdit";

export default function EditGalery({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <>
      <Breadcrumb
        pageName="Edit Galery"
        linkPrevious={[
          { href: "/galery", name: "Galery / " },
          { href: "", name: "Edit", active: true },
        ]}
      />

      <div className="p-4 w-full bg-white rounded">
        <FormEditGalery id={id}></FormEditGalery>
      </div>
    </>
  );
}
