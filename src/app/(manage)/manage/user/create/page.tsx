"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Container } from "@/components/common/container";
import FormPostUser from "@/module/user/Form/FormPost";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/partials/common/toolbar";
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
  }, [status, data, router]);

  return (
    <div>
      <Toolbar>
        <ToolbarHeading />

        <ToolbarActions>


        </ToolbarActions>
      </Toolbar>
      <Container>
        <FormPostUser></FormPostUser>
      </Container>
    </div>
  );
}
