import { useState } from "react";
import {
  isConfirmDeleteAtom,
  paramsDeleteAtom,
  statusDeleteAtom,
} from "@/common/module/SettingsJotai";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ConfirmDeleteModal({ hooks, refetch = () => {} }: any) {
  const { mutate } = hooks;
  const [isConfirmDelete, setIsConfirmDelete] = useAtom(isConfirmDeleteAtom);
  const [, setStatusDelete] = useAtom(statusDeleteAtom);
  const [paramsDelete] = useAtom(paramsDeleteAtom);
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = () => {
    setIsLoading(true); // Aktifkan loading
    mutate(paramsDelete, {
      onSuccess: () => {
        setIsLoading(false);
        setIsConfirmDelete(false);
        setStatusDelete(true);
        refetch();
        toast.success("Berhasil dihapus");
      },
      onError: () => {
        setIsLoading(false);
        setIsConfirmDelete(false);
        setStatusDelete(false);
        toast.error("Maaf data tidak dapat dihapus");
      },
    });
  };

  const handleClose = () => {
    if (!isLoading) setIsConfirmDelete(false);
  };

  return (
    <>
      <input
        type="checkbox"
        id="confirm-modal"
        className="modal-toggle"
        checked={isConfirmDelete}
        onChange={(e) => setIsConfirmDelete(e.target.checked)}
      />
      <div className="modal" role="dialog">
        <div className="modal-box bg-white">
          <div className="flex justify-center mb-4">
            <HiOutlineExclamationCircle className="text-warning text-6xl" />
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-center text-slate-600">
            Are you sure?
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            You won&apos;t t be able to revert this!
          </p>
          <div className="flex justify-center gap-4">
            <button
              className={`btn  ${
                isLoading ? "btn-disabled loading" : ""
              }`}
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Yes, delete it!"}
            </button>
            <label
              htmlFor="confirm-modal"
              className={`btn btn-error ${isLoading ? "btn-disabled" : ""}`}
              onClick={handleClose}
            >
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
