import LoadingTableCustom from "@/components/Loading/LoadingTableCustom";
import TableCustom from "@/components/Table/TableCustom";
import { useAllUser } from "@/services/api/user/get/get.hooks";
import { UserDetail as UserDetailType } from "@/types/User/TypeUser";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useAtom } from "jotai";
import {
  isConfirmDeleteAtom,
  paramsDeleteAtom,
} from "@/common/module/SettingsJotai";
import { Button } from "react-daisyui";
import { useDeleteUser } from "@/services/api/user/delete/delete.hooks";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";
import { useSession } from "next-auth/react";
import { hasPermission } from "@/utils/permissions";
import ToggleHelmet from "@/components/FormGroup/ToggleHelmet";
import { useMutation } from "@tanstack/react-query";
import { PostStatusHelmetOnFunction } from "@/services/api/helmet/post/PostStatusHelmetOnFunction";
import { PostStatusHelmetOffFunction } from "@/services/api/helmet/post/PostStatusHelmetOffFunction";

export default function TableUser() {
  const { isLoading, data, refetch } = useAllUser();
  const { status, data: dataSession } = useSession();

  const columnHelper = createColumnHelper<UserDetailType>();

  const postStatusOnHelmet = useMutation({
    mutationFn: PostStatusHelmetOnFunction,
  });

  const postStatusOffHelmet = useMutation({
    mutationFn: PostStatusHelmetOffFunction,
  });

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "email",
      cell: (info) => info.getValue(),
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "action",
      cell: (info) => (
        <div className="flex gap-2">
          {hasPermission(dataSession?.user, "user.update") && (
            <Link
              href={`/user/${info.getValue()}/edit`}
              className="btn btn-warning"
            >
              Edit
            </Link>
          )}
          {hasPermission(dataSession?.user, "user.delete") && (
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
  const deleteHooks = useDeleteUser(paramsDelete);

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
