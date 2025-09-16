"use client";

import { Container } from "@/components/common/container";
import TableListRecording from "@/module/recording/TableListRecording";
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/partials/common/toolbar";
import { useGetSpaceDisk } from "@/services/api/disk/get/get.hooks";
import Link from "next/link";
import { useEffect } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function Recording({
  params,
}: Readonly<{ params: { type: string; path_slug: string } }>) {

  const { isLoading: isLoadingSpaceDisk, data: dataSpaceDisk } = useGetSpaceDisk();

  return (


    <div>
      <Toolbar>
        <ToolbarHeading />
        <ToolbarActions>
          {!isLoadingSpaceDisk && (
            <p className="text text-slate-600 font-bold">
              Disk Usage: {dataSpaceDisk?.usage}
            </p>
          )}
        </ToolbarActions>
      </Toolbar>
      <Container>
        <TableListRecording path_slug={params.path_slug} />
      </Container>
    </div>
  );
}