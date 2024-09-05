import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { Suspense, lazy } from "react";

import { ProtectedRoute } from "./utils/protected-routes/ProtectedRoute";
import { PublicRoutes } from "./utils/public-routes/PublicRoutes";
import AuthListenerComponent from "./components/auth/AuthListenerComponent";
import Loader from "./components/loader-ui/Loader";
import NotFoundPage from "./components/pages/NotFoundPage";
import Search from "./components/pages/Search";
import Header from "./components/layout/Header";

const LogIn = lazy(() => import("./components/pages/LogIn"));
const Browse = lazy(() => import("./components/pages/feed/Browse"));

export default function App(): JSX.Element {
  return (
    <Router>
      <RecoilRoot>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              backgroundColor: "#e50914",
              color: "white",
              fontWeight: "bold",
            },
          }}
        />
        <AuthListenerComponent />
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoutes>
                  <LogIn />
                </PublicRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <LogIn />
                </PublicRoutes>
              }
            />
            <Route
              path="/browse"
              element={
                <ProtectedRoute>
                  <Browse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </Router>
  );
}
