import { atom } from "jotai";

export const isConfirmDeleteAtom = atom<boolean>(false);
export const paramsDeleteAtom = atom<any>({});
export const statusDeleteAtom = atom<boolean | null>(null);
