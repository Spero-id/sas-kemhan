// import {
//   isConfirmDeleteAtom,
//   paramsDeleteAtom,
//   statusDeleteAtom,
// } from "@/common/module/SettingsJotai";
// import { useAtom } from "jotai";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// export default function ConfirmDeleteModal({ hooks, refetch = () => {} }: any) {
//   const { mutate } = hooks;
//   const [, setIsConfirmDelete] = useAtom(isConfirmDeleteAtom);
//   const [, setStatusDelete] = useAtom(statusDeleteAtom);
//   const [paramsDelete] = useAtom(paramsDeleteAtom);

//   withReactContent(Swal)
//     .fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     })
//     .then((result) => {
//       if (result.isConfirmed) {
//         mutate(paramsDelete, {
//           onSuccess() {
//             setIsConfirmDelete(false);
//             setStatusDelete(true);
//             refetch();
//             toast.success("Berhasil di hapus");
//           },
//           onError() {
//             setIsConfirmDelete(false);
//             setStatusDelete(false);
//             toast.error("Telah terjadi kesalahan");
//           },
//         });
//       } else {
//         setIsConfirmDelete(false);
//       }
//     });

//   return <></>;
// }
