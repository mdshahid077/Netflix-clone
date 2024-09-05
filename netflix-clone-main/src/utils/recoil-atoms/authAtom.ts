import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-auth-persist",
  storage: sessionStorage,
});

interface Credentials {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export const authAtom = atom<{
  userCredentials: Credentials | null;
  isLoggedIn: boolean;
}>({
  key: "authState",
  default: {
    userCredentials: null,
    isLoggedIn: false,
  },
  effects_UNSTABLE: [persistAtom],
});
