export type StopRecordRequest = Partial<{
  pathSlug: string;
  uniqueName: string;
}>;

export type StopRecordResponse = {
  message: string;
};

export type StartRecordRequest = Partial<{
  pathSlug: string;
  rtspUrl: string;
  uniqueName: string;
}>;

export type StartRecordResponse = {
  message: string;
  uniqueName: string;
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
  audio: boolean;
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

export type RecordFile = {
  ETag: string;
  Key: string;
  LastModified: string;
  size: number;
  StorageClass: string;
};
