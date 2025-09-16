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
import { useAllBodyWorm } from "@/services/api/body_worm/get/get.hooks";
import { BodyWorm as BodyWormType } from "@/types/BodyWorm/TypeBodyWorm";
import { useDeleteBodyWorm } from "@/services/api/body_worm/delete/delete.hooks";
import ToggleStream from "@/components/StreamCard/ToggleStream";

export default function TableBodyWorm() {
  const { isLoading, data, refetch } = useAllBodyWorm();
  const { status, data: dataSession } = useSession();

  const columnHelper = createColumnHelper<BodyWormType>();

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor((row) => row?.status, {
      id: "status_helmet",
      cell: (info) => {
        if (info.row.original.need_convert) {
          return (
            <ToggleStream
              path_slug={info.row.original.path_slug}
              status={info.row.original.status}
              rtsp={info.row.original.rtsp_url}
              type={3}
              audio={true}
            />
          );
        } else {
          return (<p>-</p>)

        }

      },
      header: () => <span>Status Body Worm</span>,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "action",
      cell: (info) => (
        <div className="flex gap-2">
          {hasPermission(dataSession?.user, "body_worm.update") && (
            <a
              href={`/manage/body-worm/${info.getValue()}/edit`}
              className="btn btn-warning"
            >
              Edit
            </a>
          )}
          {hasPermission(dataSession?.user, "body_worm.delete") && (
            <Button
              className="btn btn-error"
              onClick={() => handleDelete(String(info.getValue()))}
            >
              Delete
            </Button>
          )}
          <a
            href={`/manage/recording/body-worm/${info.row.original.path_slug}`}
            className="btn"
          >
            Recording Logs
          </a>
        </div>
      ),
      header: () => <span>Action</span>,
    }),
  ];

  const [isConfirmDelete, setIsConfirmDelete] = useAtom(isConfirmDeleteAtom);
  const [paramsDelete, setParamsDelete] = useAtom(paramsDeleteAtom);
  const deleteHooks = useDeleteBodyWorm(paramsDelete);

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
