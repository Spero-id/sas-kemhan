// lib/upload.ts
import fs from 'fs';
import path from 'path';

export async function saveFileToDisk(file: File, folderName: string = 'uploads') {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', folderName);
  const filePath = path.join(uploadDir, file.name);

  fs.mkdirSync(uploadDir, { recursive: true });
  fs.writeFileSync(filePath, buffer);

  return `/` + path.join(folderName, file.name).replace(/\\/g, '/'); // Untuk Windows
} 


export function deleteFileFromDisk(fileUrl: string) {
  try {
    const filePath = path.join(process.cwd(), 'public', fileUrl.replace(`/`, ''));

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    } else {
      console.warn(`File not found: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error('Failed to delete file:', error);
    return false;
  }
}