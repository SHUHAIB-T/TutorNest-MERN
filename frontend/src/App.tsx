import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authenticate from "./components/Auth/Authenticate";

const StudentSignUp = lazy(() => import("./pages/SignupPage/StudentSignUp"));
const HomPage = lazy(() => import("./pages/HomePage/HomPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const TutorSignup = lazy(() => import("./pages/SignupPage/TutorSignup"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomPage />} />
          <Route element={<Authenticate />}>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/student/signup" element={<StudentSignUp />} />
            <Route path="/tutor/signup" element={<TutorSignup />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
