import { Button } from "react-daisyui";
import InputForm from "@/components/FormGroup/Input";
import ToggleCustom from "@/components/FormGroup/ToggleCustom";

export default function FormElement({
  control,
  onSubmit,
  handleSubmit = () => {},
}: Readonly<{
  control: any;
  onSubmit: any;
  handleSubmit?: any;
}>) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        name="path_slug"
        type="text"
        isRequired={true}
        label="Path Slug"
        placeholder="Path Slug"
      ></InputForm>
      <InputForm
        control={control}
        name="rtsp_url"
        type="text"
        isRequired={true}
        label="RTSP URL"
        placeholder="RTSP URL"
      ></InputForm>
      <ToggleCustom
        control={control}
        name="status"
        label="Status"
      ></ToggleCustom>
      <Button type="submit" className="mt-3">
        Save
      </Button>
    </form>
  );
}
