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
import { useAllRole } from "@/services/api/role/get/get.hooks";
import { Role as RoleType } from "@/types/Role/TypeRole";
import { useDeleteRole } from "@/services/api/role/delete/delete.hooks";
import { useSession } from "next-auth/react";
import { hasPermission } from "@/utils/permissions";

export default function TableRole() {
  const { isLoading, data, refetch } = useAllRole();
  const { status, data: dataSession } = useSession();

  const columnHelper = createColumnHelper<RoleType>();

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
          {hasPermission(dataSession?.user, "role.update") && (
            <Link
              href={`/role/${info.getValue()}/edit`}
              className="btn btn-warning"
            >
              Edit
            </Link>
          )}
          {hasPermission(dataSession?.user, "role.delete") && (
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
  const deleteHooks = useDeleteRole(paramsDelete);

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
