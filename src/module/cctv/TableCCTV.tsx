import LoadingTableCustom from "@/components/Loading/LoadingTableCustom";
import TableCustom from "@/components/Table/TableCustom";
import { useAllCCTV } from "@/services/api/cctv/get/get.hooks";
import { CCTV as CCTVType } from "@/types/CCTV/TypeCCTV";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useAtom } from "jotai";
import {
  isConfirmDeleteAtom,
  paramsDeleteAtom,
} from "@/common/module/SettingsJotai";
import { Button } from "react-daisyui";
import { useDeleteCCTV } from "@/services/api/cctv/delete/delete.hooks";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";
import { FaCheck, FaXmark } from "react-icons/fa6";

export default function TableCCTV() {
  const { isLoading, data, refetch } = useAllCCTV();

  const columnHelper = createColumnHelper<CCTVType>();

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor((row) => row.path_slug, {
      id: "path_slug",
      cell: (info) => info.getValue(),
      header: () => <span>Path Slug</span>,
    }),
    columnHelper.accessor((row) => row.rtsp_url, {
      id: "rtsp_url",
      cell: (info) => info.getValue(),
      header: () => <span>RTSP URL</span>,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "status",
      cell: (info) => (
        <i>
          {info.getValue() ? (
            <FaCheck className="text-green-500" />
          ) : (
            <FaXmark className="text-danger" />
          )}
        </i>
      ),
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "action",
      cell: (info) => (
        <div className="flex gap-2">
          <Link
            href={`/cctv/${info.getValue()}/edit`}
            className="btn btn-warning"
          >
            Edit
          </Link>
          <Button
            className="btn btn-error"
            onClick={() => handleDelete(String(info.getValue()))}
          >
            Delete
          </Button>
        </div>
      ),
      header: () => <span>Action</span>,
    }),
  ];

  const [isConfirmDelete, setIsConfirmDelete] = useAtom(isConfirmDeleteAtom);
  const [paramsDelete, setParamsDelete] = useAtom(paramsDeleteAtom);
  const deleteHooks = useDeleteCCTV(paramsDelete);

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
        <TableCustom data={data?.data} columns={columns}></TableCustom>
      )}

      {isConfirmDelete && (
        <ConfirmDeleteModal hooks={deleteHooks} refetch={refetch} />
      )}
    </>
  );
}
