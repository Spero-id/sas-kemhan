
"use client";

import { Container } from "@/components/common/container";
import TableRole from "@/module/role/TableRole";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/partials/common/toolbar";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Role() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "role.view")
    ) {
      router.push("/");
    }
  }, [status, data, router]);

  return (
    <div>
      <Toolbar>
        <ToolbarHeading />

        <ToolbarActions>

          {status === "authenticated" &&
            hasPermission(data?.user, "role.create") && (
              <a href={"/manage/role/create"} className="btn">
                Create
              </a>
            )}

        </ToolbarActions>
      </Toolbar>
      <Container>
        <TableRole />
      </Container>
    </div>
  );
}
