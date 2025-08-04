"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Select from "react-select";

interface SelectCustomProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: { value: string; label: string }[];
  [key: string]: any;
}

export default function SelectCustom<T extends {}>({
  control,
  name,
  label,
  options,
  ...rest
}: Readonly<SelectCustomProps<T>>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div className="flex gap-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  {label}
                  <span className="text-red-500">{rest.isRequired && "*"}</span>
                </span>
              </label>
              <Select
                name={name}
                instanceId={name}
                isClearable={rest.isClearable}
                placeholder={`Pilih ${label ?? "opsi"}`}
                options={options}
                isMulti={rest.isMulti}
                onChange={(selectedOptions) => {
                  if (rest.isMulti) {
                    if (Array.isArray(selectedOptions)) {
                      const selectedValues = selectedOptions.map(
                        (option: any) => option.value
                      );
                      onChange(selectedValues);
                    }
                  } else {
                    const selectedValue = selectedOptions
                      ? (selectedOptions as any).value
                      : undefined;
                    onChange(selectedValue);
                  }
                }}
                value={
                  rest.isMulti
                    ? value
                      ? options.filter((option) =>
                          (value as string[]).includes(option.value)
                        )
                      : undefined
                    : options.find(
                        (option) =>
                          option.value === value || option.label === value
                      ) ?? null
                }
                noOptionsMessage={() => "Tidak ada data"}
              />

              {error && (
                <p className="text-xs text-red-400 mt-2">
                  * {error?.message?.toString()}
                </p>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
