// import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";
import { IMyTutor } from "../../types/studentTypes";
import { useEffect, useState } from "react";
import api from "../../API/api";

interface prop extends IMyTutor {}
export default function TutorCard({ name, bio, profile, userID }: prop) {
  const [userId, setUserId] = useState<string>("");

  const navigate = useNavigate();
  const createChat = (id: string) => {
    setUserId(id);
  };
  useEffect(() => {
    (async function () {
      if (userId) {
        try {
          await api.post(
            "/chat",
            { userId: userId },
            { withCredentials: true }
          );
          setUserId("");
          navigate("/student/chat");
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [userId, navigate]);
  return (
    <>
      <div className="w-64 flex flex-col relative text-center items-center justify-center h-fit ring-my-ring ring-1 rounded-lg p-3 bg-my-bg-dark text-white">
        <img
          src={
            profile
              ? profile
              : "https://www.seekpng.com/png/detail/115-1150456_avatar-generic-avatar.png"
          }
          alt=""
          className="w-28 rounded-full mt-3 border-2 border-violet-700"
        />
        {/* <VerifiedIcon className="text-green-400" /> */}
        <h1 className="font-bold text-3xl">{name}</h1>
        <small>{bio}</small>
        <button
          onClick={() => {
            createChat(userID as string);
          }}
          className="bg-primary font-bold text-white w-full rounded-md my-2"
        >
          CHAT
        </button>
        <span className="text-blue-600 cursor-pointer hover:underline absolute top-2 right-4">
          Rate?
        </span>
      </div>
    </>
  );
}
