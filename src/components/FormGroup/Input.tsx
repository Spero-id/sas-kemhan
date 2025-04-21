'use client';

import { Input } from 'react-daisyui';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface InputFormProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label?: string;
	isRequired?: boolean;
	placeholder?: string;
	type?: string;
	disabled?: boolean;
}

export default function InputForm<T extends {}>({
	control,
	name,
	label,
	isRequired = false,
	placeholder,
	type,
	disabled = false,
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
								{label}{' '}
								<span className="text-danger">{isRequired && '*'}</span>
							</span>
						</label>
						<Input
							className="bg-white"
							onChange={(event) =>
								onChange(
									event.target.value === '' ? undefined : event.target.value
								)
							}
							defaultValue={value}
							placeholder={placeholder}
							type={type}
							disabled={disabled}
						/>

						{error && (
							<p className="text-xs text-danger mt-2">
								* {error?.message?.toString()}
							</p>
						)}
					</div>
				</div>
			)}
		/>
	);
}
