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

export type StarRequest = Partial<{
  type: 1 | 2 | 3;
  pathSlug: string;
  status: boolean;
}>;

export type StarResponse = {
  message: string;
};