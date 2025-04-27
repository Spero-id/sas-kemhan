export type UploadVideoRequest = Partial<{
  file: File;
}>;

export type UploadVideoResponse = {
  message: string;
};
