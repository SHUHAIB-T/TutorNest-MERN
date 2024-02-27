import StudentNav from "../../components/NavBar/StudentNav";
import StudentSideBar from "../../components/StudentSideBar/StudentSideBar";
import TutorCard from "../../components/TutorCard/TutorCard";

export default function Mytutors() {
  return (
    <>
      <StudentNav />
      <div className="flex md:px-10 p-4 gap-10 bg-secondary md:pb-64 md:pt-10">
        <StudentSideBar />
        <div className="flex flex-wrap gap-4">
          <TutorCard />
        </div>
      </div>
    </>
  );
}
