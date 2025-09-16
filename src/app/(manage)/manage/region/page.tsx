
"use client";

import { Container } from "@/components/common/container";
import TableRegion from "@/module/region/TableRegion";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/partials/common/toolbar";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Region() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasPermission(data?.user, "region.view")
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
            hasPermission(data?.user, "region.create") && (
              <a href={"/manage/region/create"} className="btn">
                Create
              </a>
            )}
        </ToolbarActions>
      </Toolbar>
      <Container>
        <TableRegion />
      </Container>
    </div>
  );
}
