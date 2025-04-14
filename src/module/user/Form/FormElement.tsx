import { Button } from "react-daisyui";
import TextArea from "@/components/FormGroup/Textarea";
import FilePondInput from "@/components/FormGroup/FilePond";
import ToggleCustom from "@/components/FormGroup/ToggleCustom";
import InputForm from "@/components/FormGroup/Input";
import { ACCEPTED_IMAGE_TYPES } from "@/utils/constant";

export default function FormElement({
  control,
  onSubmit,
  valuePhotos = [],
  handleSubmit = () => {},
  hooksDeleteFile = () => {},
}: Readonly<{
  control: any;
  onSubmit: any;
  valuePhotos?: any;
  handleSubmit?: any;
  hooksDeleteFile?: any;
}>) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FilePondInput
        control={control}
        name="file"
        label="Upload File"
        isRequired={true}
        allowMultiple={true}
        allowFileTypeValidation={true}
        acceptedFileTypes={ACCEPTED_IMAGE_TYPES}
        allowFileSizeValidation={true}
        maxFileSize={(1 * 1024 * 1024).toString()}
        value={valuePhotos}
        hooksDelete={hooksDeleteFile}
      />
      <InputForm
        control={control}
        name="name"
        type="text"
        isRequired={true}
        label="Nama"
        placeholder="Nama"
      ></InputForm>
      <TextArea
        control={control}
        name="ket"
        label="Keterangan"
        placeholder="Keterangan"
        isRequired={true}
      />
      <ToggleCustom
        control={control}
        name="publish"
        label="Publish"
      ></ToggleCustom>
      <Button type="submit" className="mt-3">
        Save
      </Button>
    </form>
  );
}
