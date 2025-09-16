"use client";

import { Container } from "@/components/common/container";
import ButtonGenerateMediaMTX from "@/components/GenerateMediaMTX";
import TableBodyWorm from "@/module/body_worm/TableBodyWorm";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/partials/common/toolbar";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BodyWorm() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !hasPermission(data?.user, "body_worm.view")) {
      router.push("/");
    }
  }, [status, data, router]);

  return (
  
    <div>
      <Toolbar>
        <ToolbarHeading />

        <ToolbarActions>

          <ButtonGenerateMediaMTX />
          {status === "authenticated" &&
            hasPermission(data?.user, "body_worm.create") && (
              <Link href={"/manage/body-worm/create"} className="btn">
                Create
              </Link>
            )}

        </ToolbarActions>
      </Toolbar>
      <Container>
        <TableBodyWorm />
      </Container>
    </div>
  );
}
