//? fungsi buildFormData ini untuk memasukkan semua datanya ke dalam FormData dengan metode recursive
//? kenapa menggunakan metode recursive? karena ketika case object didalam object ini adalah pendekatan yang paling umum dan efektif

const buildFormData = (formData: FormData, data: any, parentKey?: any) => {
	if (
		data &&
		typeof data === 'object' &&
		!(data instanceof Date) &&
		!(data instanceof File)
	) {
		for (const key of Object.keys(data)) {
			buildFormData(
				formData,
				data[key],
				parentKey ? `${parentKey}[${key}]` : key
			);
		}
	}else {
		if (data !== undefined && data !== null) {
			formData.append(parentKey, data);
		}
	}
};

export { buildFormData };
