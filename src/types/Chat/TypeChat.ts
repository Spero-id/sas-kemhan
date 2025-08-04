export type UploadVideoRequest = Partial<{
  file: File;
  roomId: string;
  userLogged: string;
}>;

export type UploadVideoResponse = {
  message: string;
};
