"use client";

import LoadingTableCustom from "@/components/Loading/LoadingTableCustom";
import TableCustom from "@/components/Table/TableCustom";
import { createColumnHelper } from "@tanstack/react-table";
import { useAllRecording } from "@/services/api/recording/get/get.hooks";
import { useEffect, useState } from "react";
import { RecordFile } from "@/types/Stream/TypeStream";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import { useSignedUrl } from "@/services/api/signed_url/get/get.hooks";
import { IoClose } from "react-icons/io5";
import { useAtom } from "jotai";
import {
  isConfirmDeleteAtom,
  paramsDeleteAtom,
} from "@/common/module/SettingsJotai";
import { useDeleteRecording } from "@/services/api/recording/delete/delete.hooks";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";

export default function TableListRecording({
  path_slug,
}: Readonly<{
  path_slug: string;
}>) {
  const [pathRecording, setpathRecording] = useState<string>("");
  const { isLoading, data, refetch } = useAllRecording({
    path_slug: path_slug,
  });

  const { isLoading: isLoadingSigned, data: dataSigned } = useSignedUrl(
    {
      key: pathRecording || "",
    },
    {
      enabled: !!pathRecording,
    }
  );

  useEffect(() => {
    if (!isLoadingSigned) {
      console.log(dataSigned.url);
    }
  }, [isLoadingSigned]);

  const columnHelper = createColumnHelper<RecordFile>();

  const columns = [
    columnHelper.accessor((row) => row.LastModified, {
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <span>Last Modified</span>,
    }),
    columnHelper.accessor((row) => row.Key, {
      id: "action",
      cell: (info) => (
        <div className="flex gap-2">
          <button
            className="btn"
            onClick={() => handlePreview(info.getValue())}
          >
            Preview
          </button>
          <button
            className="btn btn-error"
            onClick={() => handleDelete(encodeURIComponent(info.getValue()))}
          >
            Delete
          </button>
        </div>
      ),
      header: () => <span>Action</span>,
    }),
  ];

  const handlePreview = async (path: string) => {
    setpathRecording(path);
    (
      document.getElementById("preview_record") as HTMLDialogElement
    )?.showModal();
  };

  const [isConfirmDelete, setIsConfirmDelete] = useAtom(isConfirmDeleteAtom);
  const [paramsDelete, setParamsDelete] = useAtom(paramsDeleteAtom);
  const deleteHooks = useDeleteRecording(paramsDelete);

  const handleDelete = (path: string) => {
    setIsConfirmDelete(true);
    setParamsDelete({
      id: path,
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingTableCustom />
      ) : (
        <TableCustom data={data?.data || []} columns={columns}></TableCustom>
      )}
      {isConfirmDelete && (
        <ConfirmDeleteModal hooks={deleteHooks} refetch={refetch} />
      )}
      <dialog id="preview_record" className="modal">
        <div className="modal-box" style={{ maxWidth: "75vw" }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl">Preview Video</h3>
            <form method="dialog">
              <button className="text-2xl">
                <IoClose />
              </button>
            </form>
          </div>
          {isLoadingSigned ? (
            <LoadingGetData />
          ) : (
            <video controls autoPlay playsInline className="w-full rounded-md">
              <track kind="captions"></track>
              <source src={dataSigned.url} type="video/mp4" />
            </video>
          )}
        </div>
      </dialog>
    </>
  );
}
