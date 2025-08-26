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
import { Region as RegionType } from "@/types/Region/TypeRegion";
import { useDeleteRegion } from "@/services/api/region/delete/delete.hooks";
import { useSession } from "next-auth/react";
import { hasPermission } from "@/utils/permissions";
import { useAllRegion } from "@/services/api/region/get/get.hooks";

export default function TableRegion() {
  const { isLoading, data, refetch } = useAllRegion();
  const { status, data: dataSession } = useSession();

  const columnHelper = createColumnHelper<RegionType>();

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
          {hasPermission(dataSession?.user, "region.update") && (
            <Link
              href={`/manage/region/${info.getValue()}/edit`}
              className="btn btn-warning"
            >
              Edit
            </Link>
          )}
          {hasPermission(dataSession?.user, "region.delete") && (
            <Button
              className="btn btn-error"
              onClick={() => handleDelete(String(info.getValue()))}
            >
              Delete
            </Button>
          )}
        </div>
      ),
      header: () => <span>Action</span>,
    }),
  ];

  const [isConfirmDelete, setIsConfirmDelete] = useAtom(isConfirmDeleteAtom);
  const [paramsDelete, setParamsDelete] = useAtom(paramsDeleteAtom);
  const deleteHooks = useDeleteRegion(paramsDelete);

  const handleDelete = (id: string) => {
    setIsConfirmDelete(true);
    setParamsDelete({
      id: id,
    });
  };

  return (
    <>
      {isLoading || status !== "authenticated" ? (
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
