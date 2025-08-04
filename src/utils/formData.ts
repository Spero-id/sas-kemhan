//? fungsi buildFormData ini untuk memasukkan semua datanya ke dalam FormData dengan metode recursive
//? kenapa menggunakan metode recursive? karena ketika case object didalam object ini adalah pendekatan yang paling umum dan efektif

const buildFormData = (formData: FormData, data: any, parentKey?: any) => {
  if (
    data &&
    typeof data === "object" &&
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
  } else {
    if (data !== undefined && data !== null) {
      formData.append(parentKey, data);
    }
  }
};

const buildFormDataBuffered = async (req: any) => {
  return await new Promise<{
    fields: Record<string, string>;
    file: { filename: string; buffer: Buffer; mimetype: string };
  }>((resolve, reject) => {
    const busboy = require("busboy");
    const bb = busboy({ headers: req.headers });

    const fields: Record<string, string> = {};
    let fileBuffer: Buffer[] = [];
    let fileInfo: { filename: string; mimetype: string } | null = null;

    bb.on(
      "file",
      (
        fieldname: string,
        file: NodeJS.ReadableStream,
        filename: string,
        encoding: string,
        mimetype: string
      ) => {
        const safeFilename =
          typeof filename === "string" && filename.length > 0
            ? filename
            : `recording-${Date.now()}.webm`;
        fileInfo = { filename: safeFilename, mimetype };
        file.on("data", (data) => fileBuffer.push(data));
        file.on("end", () => {});
      }
    );

    bb.on("field", (fieldname: string, val: string) => {
      fields[fieldname] = val;
    });

    bb.on("finish", () => {
      if (!fileInfo) {
        return reject(new Error("No file uploaded"));
      }
      resolve({
        fields,
        file: {
          filename: fileInfo.filename,
          buffer: Buffer.concat(fileBuffer),
          mimetype: fileInfo.mimetype,
        },
      });
    });

    req.pipe(bb);
  });
};

export { buildFormData, buildFormDataBuffered };
