import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil-atoms/authAtom";

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { isLoggedIn } = useRecoilValue(authAtom);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};
