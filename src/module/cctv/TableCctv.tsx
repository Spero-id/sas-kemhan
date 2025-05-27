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
import { useAllCctv } from "@/services/api/cctv/get/get.hooks";
import { Cctv as CctvType } from "@/types/Cctv/TypeCctv";
import { useDeleteCctv } from "@/services/api/cctv/delete/delete.hooks";

export default function TableCctv() {
  const { isLoading, data, refetch } = useAllCctv();

  const columnHelper = createColumnHelper<CctvType>();

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
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
  const deleteHooks = useDeleteCctv(paramsDelete);

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
