import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil-atoms/authAtom";
import { Navigate } from "react-router-dom";

export const PublicRoutes = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useRecoilValue(authAtom);

  return isLoggedIn ? <Navigate to="/browse" /> : children;
};
