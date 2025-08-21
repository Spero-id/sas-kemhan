import { Button, Checkbox } from "react-daisyui";
import InputForm from "@/components/FormGroup/Input";
import InputWithPrefixForm from "@/components/FormGroup/InputWithPrefix";
import ToggleForm from "@/components/FormGroup/Toggle";

export default function FormElement({
  control,
  onSubmit,
  valuePhotos = [],
  handleSubmit = () => { },
  hooksDeleteFile = () => { },
}: Readonly<{
  control: any;
  onSubmit: any;
  valuePhotos?: any;
  handleSubmit?: any;
  hooksDeleteFile?: any;
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
      <InputWithPrefixForm
        control={control}
        name="path_slug"
        type="text"
        isRequired={true}
        label="Stream ID"
        placeholder="Stream ID"
        prefix="body_worm_"
      ></InputWithPrefixForm>
      <InputForm
        control={control}
        name="rtsp_url"
        type="text"
        isRequired={true}
        label="RTSP URL"
        placeholder="RTSP URL"
      ></InputForm>
      <ToggleForm
        control={control}
        name="need_convert"
        label="Need Convert"
      ></ToggleForm>
      <Button type="submit" className="mt-3">
        Save
      </Button>
    </form>
  );
}
