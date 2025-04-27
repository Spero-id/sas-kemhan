import { Button } from "react-daisyui";
import InputForm from "@/components/FormGroup/Input";
import FilePondInput from "@/components/FormGroup/FilePond";
import { ACCEPTED_IMAGE_TYPES } from "@/utils/constant";
import ToggleCustom from "@/components/FormGroup/ToggleCustom";

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
      <hr className="my-4" />
      <InputForm
        control={control}
        name="name_cctv"
        type="text"
        isRequired={true}
        label="Nama CCTV"
        placeholder="Nama CCTV"
      ></InputForm>
      <InputForm
        control={control}
        name="path_slug_cctv"
        type="text"
        isRequired={true}
        label="Path Slug CCTV"
        placeholder="Path Slug CCTV"
      ></InputForm>
      <InputForm
        control={control}
        name="rtsp_url_cctv"
        type="text"
        isRequired={true}
        label="RTSP URL CCTV"
        placeholder="RTSP URL CCTV"
      ></InputForm>
      <ToggleCustom
        control={control}
        name="status_cctv"
        label="Status CCTV"
      ></ToggleCustom>
      <hr className="my-4" />
      <InputForm
        control={control}
        name="name_sensor_gerak"
        type="text"
        isRequired={true}
        label="Nama Sensor Gerak"
        placeholder="Nama Sensor Gerak"
      ></InputForm>
      <ToggleCustom
        control={control}
        name="status_sensor_gerak"
        label="Status Sensor Gerak"
      ></ToggleCustom>
      <hr className="my-4" />
      <InputForm
        control={control}
        name="name_body_worm"
        type="text"
        isRequired={true}
        label="Nama Body Worm"
        placeholder="Nama Body Worm"
      ></InputForm>
      <InputForm
        control={control}
        name="path_slug_body_worm"
        type="text"
        isRequired={true}
        label="Path Slug Body Worm"
        placeholder="Path Slug Body Worm"
      ></InputForm>
      <InputForm
        control={control}
        name="rtsp_url_body_worm"
        type="text"
        isRequired={true}
        label="RTSP URL Body Worm"
        placeholder="RTSP URL Body Worm"
      ></InputForm>
      <ToggleCustom
        control={control}
        name="status_body_worm"
        label="Status Body Worm"
      ></ToggleCustom>
      <Button type="submit" className="mt-3">
        Save
      </Button>
    </form>
  );
}
