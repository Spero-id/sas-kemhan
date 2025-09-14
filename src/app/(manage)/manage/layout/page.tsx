"use client";

import { Container } from "@/components/common/container";
import TableLayout from "@/module/layout/TableLayout";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/partials/common/toolbar";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "layout.view")
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
        <TableLayout />
      </Container>
    </div>
  );
}
