export type StopRequest = Partial<{
  pathSlug: string;
  rtspUrl: string;
  outputPath: string;
}>;

export type StopResponse = {
  message: string;
};

export type StartRequest = Partial<{
  pathSlug: string;
  rtspUrl: string;
}>;

export type StartResponse = {
  message: string;
};