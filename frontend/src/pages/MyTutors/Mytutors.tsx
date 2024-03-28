import StudentNav from "../../components/NavBar/StudentNav";
import StudentSideBar from "../../components/StudentSideBar/StudentSideBar";
import TutorCard from "../../components/TutorCard/TutorCard";
import api from "../../API/api";
import { useEffect, useState } from "react";
import { IMyTutor } from "../../types/studentTypes";
import RateTutor from "../../components/Modal/RateTutor";
import { Irating } from "../../types/ratingTypes";
import Footer from "../../components/Footer/Footer";

export default function Mytutors() {
  const [myteachers, setMyTeachers] = useState<IMyTutor[]>([]);
  const [tutorRatings, setTutorRatings] = useState<Irating[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [updated, setUpdated] = useState(false);

  const [currentRating, setCurrentRating] = useState<Irating | undefined>({
    rating: null,
    review: "",
    userId: "",
  });

  const [rateTutorId, setRateTutuorId] = useState<string>("");

  useEffect(() => {
    if (rateTutorId) {
      setOpenModal(true);
    }
  }, [rateTutorId]);

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

  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get("/rating", {
          withCredentials: true,
        });
        setTutorRatings(data.ratings);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [updated]);

  return (
    <>
      <RateTutor
        currentRating={currentRating}
        openModal={openModal}
        setOpenModal={setOpenModal}
        rateTutorId={rateTutorId}
        setRateTutuorId={setRateTutuorId}
        setUpdated={setUpdated}
      />
      <StudentNav />
      <div className="flex flex-wrap md:px-10 md:pt-10 md:pb-44  p-4 gap-10 bg-secondary">
        <StudentSideBar />
        <div className="flex flex-wrap gap-4">
          {myteachers.length > 0 &&
            myteachers.map((e) => {
              return (
                <TutorCard
                  setRateTutuorId={setRateTutuorId}
                  tutorRatings={tutorRatings}
                  setCurrentRating={setCurrentRating}
                  bio={e.bio}
                  name={e.name}
                  userID={e.userID}
                  profile={e.profile}
                />
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
}
