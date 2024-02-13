import "./App.css";
import "react-image-crop/dist/ReactCrop.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authenticate from "./components/Auth/Authenticate";
import Protect from "./components/Auth/Protect";

const StudentSignUp = lazy(() => import("./pages/SignupPage/StudentSignUp"));
const HomPage = lazy(() => import("./pages/HomePage/HomPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const TutorSignup = lazy(() => import("./pages/SignupPage/TutorSignup"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Authenticate />}>
            <Route path="/" element={<HomPage role="USER" />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/student/signup" element={<StudentSignUp />} />
            <Route path="/tutor/signup" element={<TutorSignup />} />
          </Route>
          <Route element={<Protect role="STUDENT" />}>
            <Route path="/student" element={<HomPage role="STUDENT" />} />
            <Route path="/student/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<Protect role="TUTOR" />}>
            <Route path="/tutor" element={<HomPage role="TUTOR" />} />
            <Route path="/profile" element={<HomPage role="TUTOR" />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
