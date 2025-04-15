import LoadingTableCustom from "@/components/Loading/LoadingTableCustom";
import TableCustom from "@/components/Table/TableCustom";
import { useAllUser } from "@/services/api/user/get/get.hooks";
import { User as UserType } from "@/types/User/TypeUser";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "react-daisyui";

export default function TableUser() {
  const { isLoading, data, refetch } = useAllUser();

  const columnHelper = createColumnHelper<UserType>();

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
          <Link
            href={`/user/${info.getValue()}/edit`}
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

  const handleDelete = (id: string) => {
    console.log('id')
  };

  return (
    <>
      {isLoading ? (
        <LoadingTableCustom />
      ) : (
        <TableCustom data={data?.data} columns={columns}></TableCustom>
      )}
    </>
  );
}
