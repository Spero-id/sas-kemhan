import { Button } from "react-daisyui";
import InputForm from "@/components/FormGroup/Input";

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
        isRequired={true}
        label="Password"
        placeholder="Password"
      ></InputForm>
      <Button type="submit" className="mt-3">
        Save
      </Button>
    </form>
  );
}
