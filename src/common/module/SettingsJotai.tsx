import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const isConfirmDeleteAtom = atom<boolean>(false);
export const searchDashboardAtom = atom<string>("");
export const paramsDeleteAtom = atom<any>({});
export const statusDeleteAtom = atom<boolean | null>(null);

type RecordingEntry = {
  status: boolean;
  name: string;
};

export const activeRecordingsAtom = atomWithStorage<Record<string, RecordingEntry>>(
  "activeRecordings",
  {}
);