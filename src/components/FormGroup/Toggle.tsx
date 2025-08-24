'use client';

import { Toggle } from 'react-daisyui';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface ToggleFormProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label: string;
	isRequired?: boolean;
	disabled?: boolean;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error';
}

export default function ToggleForm<T extends {}>({
	control,
	name,
	label,
	isRequired = false,
	disabled = false,
	size = 'md',
	color = 'primary',
}: Readonly<ToggleFormProps<T>>) {
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
						<label className="label cursor-pointer justify-start gap-2">
							<Toggle
								checked={Boolean(value)}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}
								disabled={disabled}
								size={size}
								color={color}
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
