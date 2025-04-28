import { promises as fs } from 'fs';
import path from 'path';

export async function saveFileToDiskBuffered(buffer: Buffer, filename: string, folder: string): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'public', folder);
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);
  await fs.writeFile(filePath, buffer);

  // Return URL path
  return `/${folder}/${filename}`;
}