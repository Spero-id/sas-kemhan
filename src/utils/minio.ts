import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = process.env.MINIO_BUCKET_NAME!;
const accessKey = process.env.MINIO_ACCESS_KEY!;
const secretKey = process.env.MINIO_SECRET_KEY!;
const endpoint = process.env.MINIO_ENDPOINT ?? "http://localhost:9000";

const s3 = new S3Client({
  region: "us-east-1",
  endpoint,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  forcePathStyle: true,
});

export async function uploadToMinio(
  file: File,
  folderPath: string
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const randomName = crypto.randomBytes(16).toString("hex");
  const fileExtension = file.name.split(".").pop();
  const newPath = `${folderPath}/${randomName}.${fileExtension}`;

  const uploadParams = {
    Bucket: bucketName,
    Key: newPath,
    Body: buffer,
    ContentType: file.type,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return `/${newPath}`;
}

export async function getMinioFileUrl(key: string | null): Promise<string> {
  if (!key) return "";

  const command = new GetObjectCommand({
    Bucket: process.env.MINIO_BUCKET_NAME!,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // expires in 1 hours
  return signedUrl;
}

export async function deleteMinioFile(key: string): Promise<boolean> {
  if (!key) return false;

  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.MINIO_BUCKET_NAME!,
      Key: key,
    });

    await s3.send(command);
    return true;
  } catch (error) {
    console.error("Gagal hapus file dari MinIO:", error);
    return false;
  }
}