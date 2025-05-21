export type UploadVideoRequest = Partial<{
  file: File;
  access_token: string;
}>;

export type UploadVideoResponse = {
  message: string;
};
