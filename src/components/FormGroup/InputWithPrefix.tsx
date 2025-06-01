"use client";

import { Input } from "react-daisyui";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface InputFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  prefix: string
}

export default function InputWithPrefixForm<T extends {}>({
  control,
  name,
  label,
  isRequired = false,
  placeholder,
  type,
  disabled = false,
  prefix = ''
}: Readonly<InputFormProps<T>>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="flex gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                {label}{" "}
                <span className="text-red-400">{isRequired && "*"}</span>
              </span>
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-white">
              {prefix}
              <Input
                className="w-full border-none"
                onChange={(event) =>
                  onChange(
                    event.target.value === "" ? undefined : event.target.value
                  )
                }
                defaultValue={value}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
              />
            </label>

            {error && (
              <p className="text-xs text-red-400 mt-2">
                * {error?.message?.toString()}
              </p>
            )}
          </div>
        </div>
      )}
    />
  );
}
