import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import { authAtom } from "../recoil-atoms/authAtom";

export const useAuthListener = (): void => {
  const setAuthState = useSetRecoilState(authAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is not null, so we can safely access uid, email
        const { uid, email, displayName, photoURL } = user;
        setAuthState({
          userCredentials: { uid, email, displayName, photoURL },
          isLoggedIn: true,
        });
      } else {
        setAuthState({ userCredentials: null, isLoggedIn: false });
      }
    });

    return () => unsubscribe();
  }, []);
};
