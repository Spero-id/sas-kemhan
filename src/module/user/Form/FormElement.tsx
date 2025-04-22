import { Button } from "react-daisyui";
import InputForm from "@/components/FormGroup/Input";
import FilePondInput from "@/components/FormGroup/FilePond";
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
        name="image"
        label="Upload File"
        isRequired={false}
        allowFileTypeValidation={true}
        allowMultiple={false}
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
      <InputForm
        control={control}
        name="email"
        type="email"
        isRequired={true}
        label="Email"
        placeholder="Email"
      ></InputForm>
      <InputForm
        control={control}
        name="password"
        type="password"
        isRequired={false}
        label="Password"
        placeholder="Password"
      ></InputForm>
      <Button type="submit" className="mt-3">
        Save
      </Button>
    </form>
  );
}
