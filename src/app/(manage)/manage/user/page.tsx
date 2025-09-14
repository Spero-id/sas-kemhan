"use client";

import { Container } from "@/components/common/container";
import TableUser from "@/module/user/TableUser";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/partials/common/toolbar";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function User() {
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && !hasPermission(data?.user, "user.view")) {
      router.push("/");
    }
  }, [status, data, router]);

  return (
    <div>
      <Toolbar>
        <ToolbarHeading />

        <ToolbarActions>

          {status === "authenticated" &&
            hasPermission(data?.user, "user.create") && (
              <a href={"/manage/user/create"} className="btn">
                Create
              </a>
            )}

        </ToolbarActions>
      </Toolbar>
      <Container>
        <TableUser />
      </Container>
    </div>
  );
}
