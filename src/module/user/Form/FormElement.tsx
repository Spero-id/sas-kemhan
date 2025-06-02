import { Button } from "react-daisyui";
import InputForm from "@/components/FormGroup/Input";
import FilePondInput from "@/components/FormGroup/FilePond";
import { ACCEPTED_IMAGE_TYPES } from "@/utils/constant";
import ToggleCustom from "@/components/FormGroup/ToggleCustom";
import SelectCustom from "@/components/FormGroup/Select";
import { useEffect, useState } from "react";
import { useAllRole } from "@/services/api/role/get/get.hooks";
import { Role } from "@/types/Role/TypeRole";
import InputWithPrefixForm from "@/components/FormGroup/InputWithPrefix";

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
  const [optionPermission, setOptionPermission] = useState<
    { value: string; label: string }[]
  >([]);
  const { data, isLoading } = useAllRole();

  useEffect(() => {
    if (!isLoading && data) {
      const optionsParse = data.data.map((role: Role) => ({
        value: role.id as string,
        label: role.name as string,
      }));

      setOptionPermission(optionsParse);
    }
  }, [data, isLoading]);

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
      <SelectCustom
        control={control}
        name="role_id"
        label="Role"
        flexDir="column"
        isRequired={true}
        options={optionPermission}
        isClearable={true}
      />
      <hr className="my-4" />
      <InputForm
        control={control}
        name="name_helmet"
        type="text"
        isRequired={true}
        label="Nama Helmet"
        placeholder="Nama Helmet"
      ></InputForm>
      <InputWithPrefixForm
        control={control}
        name="path_slug_helmet"
        type="text"
        isRequired={true}
        label="Path Slug Helmet"
        placeholder="Path Slug Helmet"
        prefix="helmet_"
      ></InputWithPrefixForm>
      <InputForm
        control={control}
        name="rtsp_url_helmet"
        type="text"
        isRequired={true}
        label="RTSP URL Helmet"
        placeholder="RTSP URL Helmet"
      ></InputForm>
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
      <InputWithPrefixForm
        control={control}
        name="path_slug_body_worm"
        type="text"
        isRequired={true}
        label="Path Slug Body Worm"
        placeholder="Path Slug Body Worm"
        prefix="body_worm_"
      ></InputWithPrefixForm>
      <InputForm
        control={control}
        name="rtsp_url_body_worm"
        type="text"
        isRequired={true}
        label="RTSP URL Body Worm"
        placeholder="RTSP URL Body Worm"
      ></InputForm>
      <Button type="submit" className="mt-3">
        Save
      </Button>
    </form>
  );
}
