"use client";

import { Container } from "@/components/common/container";
import ButtonGenerateMediaMTX from "@/components/GenerateMediaMTX";
import { Button } from "@/components/ui/button";
import { CardToolbar } from "@/components/ui/card";
import TableCctv from "@/module/cctv/TableCctv";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/partials/common/toolbar";
import { hasPermission } from "@/utils/permissions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Cctv() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !hasPermission(data?.user, "cctv.view")) {
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
            hasPermission(data?.user, "cctv.create") && (
              <a href={"/manage/cctv/create"} className="btn">
                Create
              </a>
            )}
        </ToolbarActions>
      </Toolbar>
      <Container>
        <TableCctv />
      </Container>
    </div>
  );
}