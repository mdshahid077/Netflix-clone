import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface ConfigState {
  language: string;
}

const { persistAtom } = recoilPersist({
  key: "recoil-config-persist",
  storage: sessionStorage,
});

export const configAtom = atom<ConfigState>({
  key: "configState",
  default: {
    language: "en",
  },
  effects_UNSTABLE: [persistAtom],
});
