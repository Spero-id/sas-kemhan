// import { createColumnHelper } from "@tanstack/react-table";
// import TableCustom from "@/components/Table/TableCustom";
// import { useAllGalery } from "@/services/api/galery/get/get.hooks";
// import { Galery as GaleryType } from "@/types/Galery/TypeGalery";
// import { FaCheck, FaXmark } from "react-icons/fa6";
// import LoadingTableCustom from "@/components/Loading/LoadingTableCustom";
// import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";
// import { Button } from "react-daisyui";
// import { useDeleteGalery } from "@/services/api/galery/delete/delete.hooks";
// import { useEffect } from "react";
// import { useAtom } from "jotai";
// import {
//   paramsDeleteAtom,
//   isConfirmDeleteAtom,
// } from "@/common/module/SettingsJotai";
// import Link from "next/link";

// export default function TableGalery() {
//   const { isLoading, data, refetch } = useAllGalery();

//   const columnHelper = createColumnHelper<GaleryType>();

//   const columns = [
//     columnHelper.accessor((row) => row.name, {
//       id: "name",
//       cell: (info) => info.getValue(),
//       header: () => <span>Name</span>,
//     }),
//     columnHelper.accessor((row) => row.publish, {
//       id: "publish",
//       cell: (info) => (
//         <i>
//           {info.getValue() ? (
//             <FaCheck className="text-green-500" />
//           ) : (
//             <FaXmark className="text-danger" />
//           )}
//         </i>
//       ),
//       header: () => <span>Publish</span>,
//     }),
//     columnHelper.accessor((row) => row.id, {
//       id: "action",
//       cell: (info) => (
//         <div className="flex gap-2">
//           <Link
//             href={`/galery/${info.getValue()}/edit`}
//             className="btn bg-warning hover:bg-warning"
//           >
//             Edit
//           </Link>
//           <Button
//             className="btn bg-danger hover:bg-danger text-white"
//             onClick={() => handleDelete(String(info.getValue()))}
//           >
//             Delete
//           </Button>
//         </div>
//       ),
//       header: () => <span>Action</span>,
//     }),
//   ];

//   const [isConfirmDelete, setIsConfirmDelete] = useAtom(isConfirmDeleteAtom);
//   const [paramsDelete, setParamsDelete] = useAtom(paramsDeleteAtom);
//   const deleteHooks = useDeleteGalery(paramsDelete);

//   const handleDelete = (id: string) => {
//     setIsConfirmDelete(true);
//     setParamsDelete({
//       id: id,
//     });
//   };

//   return (
//     <>
//       {isLoading ? (
//         <LoadingTableCustom />
//       ) : (
//         <TableCustom data={data?.data} columns={columns}></TableCustom>
//       )}

//       {isConfirmDelete && (
//         <ConfirmDeleteModal hooks={deleteHooks} refetch={refetch} />
//       )}
//     </>
//   );
// }
