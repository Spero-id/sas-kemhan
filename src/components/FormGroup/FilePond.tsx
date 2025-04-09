import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { FilePond, registerPlugin } from "react-filepond";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { FileUploaded } from "@/types/FilePond.type";
import { Button } from "react-daisyui";
import { FaRegTrashCan } from "react-icons/fa6";
import ConfirmDeleteModal from "../Modal/ConfirmDeleteModal";
import { useAtom } from "jotai";
import {
  isConfirmDeleteAtom,
  paramsDeleteAtom,
} from "@/common/module/SettingsJotai";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

interface FilePondInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  isRequired?: boolean;
  allowMultiple?: boolean;
  allowFileTypeValidation?: boolean;
  acceptedFileTypes?: string[];
  allowFileSizeValidation?: boolean;
  maxFileSize?: string | null;
  value?: FileUploaded[];
  hooksDelete?: any;
}

export default function FilePondInput<T extends {}>({
  control,
  name,
  label,
  isRequired = false,
  allowMultiple = false,
  allowFileTypeValidation = false,
  acceptedFileTypes = [],
  allowFileSizeValidation = false,
  maxFileSize = null,
  value = [],
  hooksDelete,
}: Readonly<FilePondInputProps<T>>) {
  const [isConfirmDelete, setIsConfirmDelete] = useAtom(isConfirmDeleteAtom);
  const [, setParamsDelete] = useAtom(paramsDeleteAtom);

  const handleDelete = (urlDelete: string) => {
    setIsConfirmDelete(true);
    setParamsDelete({
      urlDelete,
    });
  };
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <div className="flex gap-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  {label}{" "}
                  <span className="text-danger">{isRequired && "*"}</span>
                </span>
              </label>
              <FilePond
                onupdatefiles={(files) => {
                  if (allowMultiple) {
                    const fileArray = Array.from(files).map(
                      (file) => file.file
                    );
                    onChange(fileArray);
                  } else {
                    files.length > 0 ? onChange(files[0].file) : onChange();
                  }
                }}
                allowMultiple={allowMultiple}
                allowFileTypeValidation={allowFileTypeValidation}
                acceptedFileTypes={acceptedFileTypes}
                allowFileSizeValidation={allowFileSizeValidation}
                maxFileSize={maxFileSize}
                name={name}
                labelIdle='<span class="filepond--label-action">Browse the file</span>'
              />

              {allowMultiple
                ? value?.length > 0 && (
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">File Uploaded</span>
                      </label>
                      <div className="flex flex-wrap border rounded p-2">
                        {value?.map((file) => (
                          <div className="relative w-2/6 p-3" key={file.id}>
                            <Button
                              type="button"
                              className="absolute top-0 right-0 bg-danger hover:bg-danger text-white text-lg"
                              onClick={() =>
                                handleDelete(String(file.urlDelete))
                              }
                            >
                              <FaRegTrashCan />
                            </Button>
                            <img
                              src={file.path}
                              alt=""
                              className="w-full h-full object-contain bg-gray"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                : value?.length > 0 && (
                    <div className="flex flex-wrap">
                      {value?.map((file) => (
                        <a href={file.path} className="btn btn-primary" key={file.id} target="_blank">
                          Show
                        </a>
                      ))}
                    </div>
                  )}

              {error && (
                <p className="text-xs text-danger -mt-2">
                  * {error?.message?.toString()}
                </p>
              )}
            </div>
          </div>
        )}
      />
      {isConfirmDelete && <ConfirmDeleteModal hooks={hooksDelete} />}
    </>
  );
}
