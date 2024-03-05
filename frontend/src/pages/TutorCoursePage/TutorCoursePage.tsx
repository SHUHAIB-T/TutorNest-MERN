import { Link } from "react-router-dom";
import CourseCard from "../../components/CourseCard/CourseCard";
import NavBar from "../../components/NavBar/NavBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CreateCourseModal from "../../components/Modal/CreateCorseModal/CreateCourseModal";
import { useState } from "react";

export default function TutorCoursePage() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <CreateCourseModal openModal={openModal} setOpenModal={setOpenModal} />
      <NavBar role="TUTOR" />
      <div className="flex w-full flex-col h-[100vh] items-center bg-secondary">
        <h1 className="font-bold text-5xl text-white mt-10">My Courses</h1>
        <div className="w-[80%] mt-3 flex justify-between">
          <div className="flex items-center">
            <Link to={"/"} className="font-bold text-white">
              <ChevronLeftIcon className="mb-1" /> Back
            </Link>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-primary px-5 py-2 rounded-md text-white font-bold"
          >
            Create Course
          </button>
        </div>
        <div className="flex flex-wrap gap-4 mt-10">
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </>
  );
}
