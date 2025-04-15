"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormPostUser from "@/module/user/Form/FormPost";

export default function CreateUser() {
  return (
    <>
      <Breadcrumb
        pageName="Create User"
        linkPrevious={[
          { href: "/user", name: "User / " },
          { href: "/user/create", name: "Create", active: true },
        ]}
      />

      <div className="p-4 w-full bg-white rounded">
        <FormPostUser></FormPostUser>
      </div>
    </>
  );
}
