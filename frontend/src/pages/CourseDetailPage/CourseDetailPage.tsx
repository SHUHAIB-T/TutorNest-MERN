import StudentNav from "../../components/NavBar/StudentNav";
import CoureseBanner from "../../components/CourseBanner/CoureseBanner";
import LessonsCard from "../../components/LessonsCard/LessonsCard";
import AuthorCard from "../../components/AuthorCard/AuthorCard";
import Ratings from "../../components/Rating/Ratings";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/store";
import { getCourseDetails } from "../../features/course/courseDetails/courseDetailsServiece";
import { getEntollments } from "../../features/enrollments/enrollmentServiece";
import Footer from "../../components/Footer/Footer";

export default function CourseDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCourseDetails(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getEntollments());
  }, [dispatch]);
  return (
    <>
      <StudentNav />
      <div className="flex bg-secondary flex-col w-full min-h-screen text-gray-200">
        <CoureseBanner />
        <div className="flex flex-col items-center space-y-3">
          <div className="flex gap-10 px-10">
            <LessonsCard />
            <AuthorCard />
          </div>
        </div>
        <Ratings />
      </div>
      <Footer />
    </>
  );
}
