import "./App.css";
import "react-image-crop/dist/ReactCrop.css";
import { lazy, Suspense, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "./components/Loader/Loader1/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authenticate from "./components/Auth/Authenticate";
import Protect from "./components/Auth/Protect";
import { SocketContext } from "./contexts/SocketContext";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "./app/store";
import { setOnlineUsers } from "./features/Socket/SocketSlice";
import MyCouresPage from "./pages/MyCouresPages/MyCouresPage";
import WatchCourse from "./pages/WatchCourse/WatchCourse";
import AssessmentPage from "./pages/AssessmentPage/AssessmentPage";

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
const Mytutors = lazy(() => import("./pages/MyTutors/Mytutors"));
const StudentRequests = lazy(
  () => import("./pages/StudentRequests/StudentRequests")
);
const TutorHomePage = lazy(() => import("./pages/TutorHomePage/TutorHomePage"));
const TutorCoursePage = lazy(
  () => import("./pages/TutorCoursePage/TutorCoursePage")
);
const LessonsPage = lazy(() => import("./pages/LessonsPage/LessonsPage"));
const ChatPage = lazy(() => import("./pages/ChatPage/ChatPage"));

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
const VideoChat = lazy(() => import("./components/VideoRoom/VideoRoom"));
const CoursesPage = lazy(() => import("./pages/CoursesPage/CoursesPage"));
const CourseDetailPage = lazy(
  () => import("./pages/CourseDetailPage/CourseDetailPage")
);
const AllTutorsPage = lazy(() => import("./pages/AllTutotsPage/AllTutorsPage"));

function App() {
  const socket = useRef<Socket | null>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const URL = "https://tutornest.online";
  // const URL = "http://localhost:5000";
  useEffect(() => {
    socket.current = io(URL);
    socket.current.emit("setUser", user?._id);
    socket.current.on("getUsers", (data) => {
      console.log("online users:", data);
      dispatch(setOnlineUsers(data));
    });

    return () => {
      socket.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <SocketContext.Provider value={socket}>
          <Routes>
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/tutors" element={<AllTutorsPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route element={<Authenticate />}>
              <Route path="/" element={<HomPage />} />
              <Route path="/Login" element={<LoginPage role="PUBLIC" />} />
              <Route path="/admin/Login" element={<LoginPage role="ADMIN" />} />
              <Route path="/student/signup" element={<StudentSignUp />} />
              <Route path="/tutor/signup" element={<TutorSignup />} />
            </Route>
            <Route element={<Protect role="STUDENT" />}>
              <Route path="/student" element={<HomPage />} />
              <Route path="/student/profile" element={<ProfilePage />} />
              <Route path="/student/posts" element={<StudentPosts />} />
              <Route path="/student/requests" element={<StudentRequests />} />
              <Route path="/student/my-tutors" element={<Mytutors />} />
              <Route path="/student/my-course" element={<MyCouresPage />} />
              <Route path="/student/my-course/:id" element={<WatchCourse />} />
              <Route
                path="/student/assessment/:id"
                element={<AssessmentPage />}
              />
              <Route
                path="/student/chat"
                element={<ChatPage role="STUDENT" />}
              />
              <Route path="/student/video-chat/:id" element={<VideoChat />} />
            </Route>
            <Route element={<Protect role="TUTOR" />}>
              <Route path="/tutor" element={<TutorHomePage />} />
              <Route path="/tutor/chat" element={<ChatPage role="TUTOR" />} />
              <Route path="/tutor/video-chat/:id" element={<VideoChat />} />
              <Route path="/tutor/profile" element={<TutoProfile />} />
              <Route path="/tutor/documents" element={<Documents />} />
              <Route path="/tutor/my-students" element={<MyStudentsPage />} />
              <Route path="/tutor/courses" element={<TutorCoursePage />} />
              <Route path="/tutor/lessons/:id" element={<LessonsPage />} />
            </Route>
            <Route element={<Protect role="ADMIN" />}>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/tutors" element={<AdminTutorPage />} />
              <Route
                path="/admin/tutors/:id"
                element={<AdminTutorDocument />}
              />
              <Route path="/admin/students" element={<AdminStudentPage />} />
            </Route>
          </Routes>
        </SocketContext.Provider>
      </Suspense>
      <ToastContainer stacked />
    </>
  );
}

export default App;
