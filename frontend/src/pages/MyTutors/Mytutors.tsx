import StudentNav from "../../components/NavBar/StudentNav";
import StudentSideBar from "../../components/StudentSideBar/StudentSideBar";
import TutorCard from "../../components/TutorCard/TutorCard";
import api from "../../API/api";
import { useEffect, useState } from "react";
import { IMyTutor } from "../../types/studentTypes";

export default function Mytutors() {
  const [myteachers, setMyTeachers] = useState<IMyTutor[]>([]);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get("/student/mytutors", {
          withCredentials: true,
        });
        setMyTeachers(data.teachers);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <StudentNav />
      <div className="flex md:px-10 p-4 gap-10 bg-secondary md:pb-64 md:pt-10">
        <StudentSideBar />
        <div className="flex flex-wrap gap-4">
          {myteachers.length > 0 &&
            myteachers.map((e) => (
              <TutorCard
                bio={e.bio}
                name={e.name}
                userID={e.userID}
                profile={e.profile}
              />
            ))}
        </div>
      </div>
    </>
  );
}
