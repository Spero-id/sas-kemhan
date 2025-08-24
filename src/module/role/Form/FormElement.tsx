import { Button } from "react-daisyui";
import InputForm from "@/components/FormGroup/Input";
import SelectCustom from "@/components/FormGroup/Select";
import { useEffect, useState } from "react";
import { useAllPermission } from "@/services/api/permission/get/get.hooks";
import { Permission } from "@/types/Permission/TypePermission";

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
  const { data, isLoading } = useAllPermission();

  useEffect(() => {
    if (!isLoading && data) {
      const optionsParse = data.data.map((permission: Permission) => ({
        value: permission.id.toString(),
        label: permission.name,
      }));
      
      setOptionPermission(optionsParse);
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
      <SelectCustom
        control={control}
        name="permissions"
        label="Permission"
        flexDir="column"
        isRequired={true}
        options={optionPermission}
        isClearable={true}
        isMulti={true}
      />
      <Button type="submit" className="mt-3">
        Save
      </Button>
    </form>
  );
}
