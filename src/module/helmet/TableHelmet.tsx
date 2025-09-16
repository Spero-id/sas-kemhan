import LoadingTableCustom from "@/components/Loading/LoadingTableCustom";
import TableCustom from "@/components/Table/TableCustom";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useAtom } from "jotai";
import {
  isConfirmDeleteAtom,
  paramsDeleteAtom,
} from "@/common/module/SettingsJotai";
import { Button } from "react-daisyui";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";
import { useSession } from "next-auth/react";
import { hasPermission } from "@/utils/permissions";
import { useAllHelmet } from "@/services/api/helmet/get/get.hooks";
import { Helmet as HelmetType } from "@/types/Helmet/TypeHelmet";
import { useDeleteHelmet } from "@/services/api/helmet/delete/delete.hooks";
import ToggleStream from "@/components/StreamCard/ToggleStream";

export default function TableHelmet() {
  const { isLoading, data, refetch } = useAllHelmet();
  const { status, data: dataSession } = useSession();

  const columnHelper = createColumnHelper<HelmetType>();

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor((row) => row?.status, {
      id: "status_helmet",
      cell: (info) => {
        return (
          <ToggleStream
            path_slug={info.row.original.path_slug}
            status={info.row.original.status}
            rtsp={info.row.original.rtsp_url}
            type={2}
            audio={false}
          />
        );
      },
      header: () => <span>Status Helmet</span>,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "action",
      cell: (info) => (
        <div className="flex gap-2">
          {hasPermission(dataSession?.user, "helmet.update") && (
            <Link
              href={`/manage/helmet/${info.getValue()}/edit`}
              className="btn btn-warning"
            >
              Edit
            </Link>
          )}
          {hasPermission(dataSession?.user, "helmet.delete") && (
            <Button
              className="btn btn-error"
              onClick={() => handleDelete(String(info.getValue()))}
            >
              Delete
            </Button>
          )}
          <Link
            href={`/manage/recording/helmet/${info.row.original.path_slug}`}
            className="btn"
          >
            Recording Logs
          </Link>
        </div>
      ),
      header: () => <span>Action</span>,
    }),
  ];

  const [isConfirmDelete, setIsConfirmDelete] = useAtom(isConfirmDeleteAtom);
  const [paramsDelete, setParamsDelete] = useAtom(paramsDeleteAtom);
  const deleteHooks = useDeleteHelmet(paramsDelete);

  const handleDelete = (id: string) => {
    setIsConfirmDelete(true);
    setParamsDelete({
      id: id,
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingTableCustom />
      ) : (
        <TableCustom data={data?.data || []} columns={columns}></TableCustom>
      )}

      {isConfirmDelete && (
        <ConfirmDeleteModal hooks={deleteHooks} refetch={refetch} />
      )}
    </>
  );
}
