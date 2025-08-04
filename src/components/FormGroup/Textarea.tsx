"use client";

import { Textarea } from "react-daisyui";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface TextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export default function TextArea<T extends {}>({
  control,
  name,
  label,
  isRequired = false,
  placeholder,
  disabled = false,
}: Readonly<TextareaProps<T>>) {
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
            <Textarea
              onChange={(event) =>
                onChange(
                  event.target.value === "" ? undefined : event.target.value
                )
              }
              value={value}
              placeholder={placeholder}
              disabled={disabled}
            />

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
