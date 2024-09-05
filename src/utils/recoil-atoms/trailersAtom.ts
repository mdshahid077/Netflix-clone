import { atom } from "recoil";

export const trailersAtom = atom({
  key: "trailerState",
  default: {
    link: "",
    randomIndex: -1,
  },
});
