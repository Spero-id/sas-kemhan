import { Button, Checkbox } from "react-daisyui";
import InputForm from "@/components/FormGroup/Input";
import InputWithPrefixForm from "@/components/FormGroup/InputWithPrefix";
import ToggleForm from "@/components/FormGroup/Toggle";
import SelectCustom from "@/components/FormGroup/Select";
import { useEffect, useState } from "react";
import { useAllRegion } from "@/services/api/region/get/get.hooks";
import { Region } from "@/types/Region/TypeRegion";

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


  const [optionRegion, setOptionRegion] = useState<
    { value: string; label: string }[]
  >([]);
  const { data, isLoading } = useAllRegion();

  useEffect(() => {
    if (!isLoading && data) {
      const optionsParse = data.data.map((region: Region) => ({
        value: region.id!.toString(),
        label: region.name!,
      }));

      setOptionRegion(optionsParse);
    }
  }, [data, isLoading]);

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
      <SelectCustom
        control={control}
        name="region_id"
        label="Region"
        flexDir="column"
        isRequired={true}
        options={optionRegion}
        isClearable={true}
        isMulti={false}
      />
      <Button type="submit" className="mt-3">
        Save
      </Button>
    </form>
  );
}
