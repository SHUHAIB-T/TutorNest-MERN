import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const StudentSignUp = lazy(() => import("./pages/SignupPage/StudentSignUp"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/student/signup" element={<StudentSignUp />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
