import "./App.css";
import "react-image-crop/dist/ReactCrop.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "./components/Loader/Loader1/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authenticate from "./components/Auth/Authenticate";
import Protect from "./components/Auth/Protect";

const StudentSignUp = lazy(() => import("./pages/SignupPage/StudentSignUp"));
const HomPage = lazy(() => import("./pages/HomePage/HomPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const TutorSignup = lazy(() => import("./pages/SignupPage/TutorSignup"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const MyStudentsPage = lazy(
  () => import("./pages/MyStudentsPage/MyStudentsPage")
);
const TutoProfile = lazy(() => import("./pages/TutorProfile/TuroProfile"));
const Documents = lazy(() => import("./components/Documents/Documents"));
const StudentPosts = lazy(() => import("./pages/StudentPosts/StudentPosts"));
const StudentRequests = lazy(
  () => import("./pages/StudentRequests/StudentRequests")
);
const TutorHomePage = lazy(() => import("./pages/TutorHomePage/TutorHomePage"));
const AdminHome = lazy(() => import("./pages/AdminHome/AdminHome"));
const AdminProfile = lazy(
  () => import("./pages/AdminProfilePage/AdminProfile")
);
const AdminTutorPage = lazy(
  () => import("./pages/AdminTutorPage/AdminTutorPage")
);
const AdminStudentPage = lazy(
  () => import("./pages/AdminStudentPage/AdminStudentPage")
);
const AdminTutorDocument = lazy(
  () => import("./pages/AdminTutorDocument/AdminTutorDocument")
);

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Authenticate />}>
            <Route path="/" element={<HomPage role="USER" />} />
            <Route path="/Login" element={<LoginPage role="PUBLIC" />} />
            <Route path="/admin/Login" element={<LoginPage role="ADMIN" />} />
            <Route path="/student/signup" element={<StudentSignUp />} />
            <Route path="/tutor/signup" element={<TutorSignup />} />
          </Route>
          <Route element={<Protect role="STUDENT" />}>
            <Route path="/student" element={<HomPage role="STUDENT" />} />
            <Route path="/student/profile" element={<ProfilePage />} />
            <Route path="/student/posts" element={<StudentPosts />} />
            <Route path="/student/requests" element={<StudentRequests />} />
          </Route>
          <Route element={<Protect role="TUTOR" />}>
            <Route path="/tutor" element={<TutorHomePage />} />
            <Route path="/tutor/profile" element={<TutoProfile />} />
            <Route path="/tutor/documents" element={<Documents />} />
            <Route path="/tutor/my-students" element={<MyStudentsPage />} />
          </Route>
          <Route element={<Protect role="ADMIN" />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/tutors" element={<AdminTutorPage />} />
            <Route path="/admin/tutors/:id" element={<AdminTutorDocument />} />
            <Route path="/admin/students" element={<AdminStudentPage />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
