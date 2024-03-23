import Rating from "@mui/material/Rating";
import { ITutorProfile } from "../../types/tutorTypes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../API/api";
import { useAppSelector } from "../../app/store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface props extends ITutorProfile {
  averageRating: number | undefined;
  isRequested: boolean | undefined;
  isInConnection: boolean | undefined;
  _id: string | undefined;
}
export default function TutorDetailCard({
  _id,
  bio,
  languages,
  name,
  pricing,
  profile,
  qualification,
  averageRating,
  isRequested,
  isInConnection,
}: props) {
  const [userId, setUserId] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth);
  const [requsted, setRequested] = useState<boolean>(isRequested as boolean);
  useEffect(() => {
    setRequested(isRequested as boolean);
  }, [isRequested]);

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
          setUserId("");
          console.log(err);
        }
      }
    })();
  }, [userId, navigate]);

  const createConnection = async (id: string) => {
    if (user) {
      try {
        const { data } = await api.post("/student/createConnection", {
          teacherId: id,
        });
        if (data.success) {
          setRequested(true);
          console.log("request created");
        }
      } catch (err) {
        setRequested(false);
        console.log(err);
      }
    } else {
      navigate("/login");
    }
  };

  const cancelConnection = async (id: string) => {
    if (user) {
      try {
        const { data } = await api.post("/student/cancelConnection", {
          teacherId: id,
        });
        if (data.success) {
          setRequested(false);
          console.log("request cancelled");
        }
      } catch (err) {
        setRequested(true);
        console.log(err);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className="w-64 h-96 relative px-3 text-gray-200 py-4 bg-my-bg-dark rounded-lg flex flex-col items-center">
          <img
            src={
              profile
                ? profile
                : "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-login-interface-abstract-blue-icon-png-image_3917504.jpg"
            }
            alt=""
            className="w-28 h-28 rounded-full object-cover ring-2 ring-my-ring"
          />
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-xl">{name}</h1>
            <small>{bio}</small>
          </div>
          <div className="flex w-full items-center justify-between px-5">
            <Rating
              name="read-only"
              className="mt-3"
              value={averageRating ? averageRating : 0}
              size="small"
              readOnly
            />
            <span className="text-green-500 mt-3 font-bold"> ₹{pricing}</span>
          </div>
          <div className="w-full h-1 bg-my-ring/[0.2] mt-2" />
          <div className="flex flex-wrap justify-center gap-2 my-2 max-h-16 overflow-auto w-full px-3">
            {languages?.map((e) => (
              <small className="px-3 text-gray-400 bg-my-input h-fit rounded-full">
                {e}
              </small>
            ))}
          </div>
          <div className="w-full h-1 bg-my-ring/[0.2] " />
          <div className="flex flex-wrap justify-center gap-2 my-2 max-h-16 overflow-auto w-full px-3">
            {qualification?.map((e) => (
              <small className="px-3 text-gray-400 bg-my-input h-fit rounded-full">
                {e}
              </small>
            ))}
          </div>
          <div className="absolute bottom-4">
            {!isInConnection && !requsted && (
              <button
                onClick={() => createConnection(_id as string)}
                className="font-bold py-1 px-3 bg-primary rounded-lg"
              >
                connect now
              </button>
            )}
            {requsted && !isInConnection && (
              <button
                onClick={() => cancelConnection(_id as string)}
                className="font-bold py-1 px-3 bg-primary rounded-lg"
              >
                cancell request
              </button>
            )}
            {isInConnection && (
              <button
                onClick={() => {
                  createChat(_id as string);
                }}
                className="font-bold py-1 px-3 bg-primary rounded-lg"
              >
                chat now
              </button>
            )}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
