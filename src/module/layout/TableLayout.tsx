import LoadingTableCustom from "@/components/Loading/LoadingTableCustom";
import TableCustom from "@/components/Table/TableCustom";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { Role as RoleType } from "@/types/Role/TypeRole";
import { useAllLayout } from "@/services/api/layout/get/get.hooks";

export default function TableLayout() {
  const { isLoading, data } = useAllLayout();

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
          <Link
            href={`/layout/${info.getValue()}/edit`}
            className="btn btn-warning"
          >
            Edit
          </Link>
        </div>
      ),
      header: () => <span>Action</span>,
    }),
  ];

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
