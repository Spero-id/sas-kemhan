"use client";

import { Container } from "@/components/common/container";
import ButtonGenerateMediaMTX from "@/components/GenerateMediaMTX";
import TableHelmet from "@/module/helmet/TableHelmet";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/partials/common/toolbar";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Helmet() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !hasPermission(data?.user, "helmet.view")) {
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
            hasPermission(data?.user, "helmet.create") && (
              <Link href={"/manage/helmet/create"} className="btn">
                Create
              </Link>
            )}

        </ToolbarActions>
      </Toolbar>
      <Container>
        <TableHelmet />
      </Container>
    </div>
  );
}
