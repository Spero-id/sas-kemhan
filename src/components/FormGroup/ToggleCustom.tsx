"use client";

import { Toggle } from "react-daisyui";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ToggleCustomProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  isRequired?: boolean;
  disabled?: boolean;
}

export default function ToggleCustom<T extends {}>({
  control,
  name,
  label,
  isRequired = false,
  disabled = false,
}: Readonly<ToggleCustomProps<T>>) {
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
            <Toggle
              className="border-0 rounded-none"
              disabled={disabled}
			  onChange={(event) => onChange(event.target.checked)}
              checked={value ? true : false}
              style={{
                border: `${error ? "2px solid #E53E3E" : "1px solid #CBD5E0"}`,
              }}
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
