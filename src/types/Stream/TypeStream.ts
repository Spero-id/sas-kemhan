export type StopRecordRequest = Partial<{
  pathSlug: string;
  rtspUrl: string;
  outputPath: string;
}>;

export type StopRecordResponse = {
  message: string;
};

export type StartRecordRequest = Partial<{
  pathSlug: string;
  rtspUrl: string;
}>;

export type StartRecordResponse = {
  message: string;
};

export type StopStreamRequest = Partial<{
  pathSlug: string;
  type: 2 | 3;
}>;

export type StopStreamResponse = {
  message: string;
};

export type StartStreamRequest = Partial<{
  pathSlug: string;
  rtspUrl: string;
  type: 2 | 3;
}>;

export type StartStreamResponse = {
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
