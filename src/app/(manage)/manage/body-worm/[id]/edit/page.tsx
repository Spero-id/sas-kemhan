"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Container } from "@/components/common/container";
import FormEditBodyWorm from "@/module/body_worm/Form/FormEdit";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/partials/common/toolbar";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditBodyWorm({
  params,
}: Readonly<{ params: { id: string } }>) {
  const id = params.id;

  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "body_worm.update")
    ) {
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
        <FormEditBodyWorm id={id}></FormEditBodyWorm>
      </Container>
    </div>
  );
}
