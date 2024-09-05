import { atom } from "recoil";

export const movieSearchAtom = atom<string[] | null>({
  key: "movieSearchState",
  default: [],
});
