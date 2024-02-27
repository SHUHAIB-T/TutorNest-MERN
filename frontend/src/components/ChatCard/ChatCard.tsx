import { useEffect, useState } from "react";
import { Ichat } from "../../types/chatandMessage";
import { userType } from "../../types/authTypes";
import api from "../../API/api";
import { useAppSelector } from "../../app/store";
type prop = {
  chat: Ichat;
  user: userType;
};
type userDtaType = {
  name: string;
  profile: string;
  userID: string;
};

export default function ChatCard({ chat, user }: prop) {
  const [userData, setUserData] = useState<userDtaType>();
  const [online, setOnline] = useState<boolean>(false);
  const { onlineUsers } = useAppSelector((state) => state.socket);
  useEffect(() => {
    (async function () {
      const userId = chat.members?.find((e) => e !== user._id);
      try {
        const { data } = await api.get(`/userProfile/${userId}`, {
          withCredentials: true,
        });
        setUserData(data.userProfile);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [chat.members, user._id]);

  useEffect(() => {
    onlineUsers.map((e) => {
      if (e.userId === userData?.userID) {
        setOnline(true);
      }
    });

    return () => {
      setOnline(false);
    };
  }, [onlineUsers, userData?.userID]);

  return (
    <div className="flex relative w-full items-center gap-4 cursor-pointe p-2 cursor-pointer hover:bg-my-input text-white">
      <img
        className="w-10 h-10 rounded-full"
        src={
          userData?.profile
            ? userData.profile
            : "https://profilemagazine.com/wp-content/uploads/2020/04/Ajmere-Dale-Square-thumbnail.jpg"
        }
        alt=""
      />
      <div>
        <h1 className="font-bold text-xl">{userData?.name}</h1>
        {chat.latest_message && (
          <small>
            {chat.latest_message.teacherProfile ? (
              <>
                <span>{chat.latest_message.teacherProfile.name}: </span>
                <span>{chat.latest_message.content?.slice(0, 20)}... </span>
              </>
            ) : (
              <>
                <span>{chat.latest_message.userDetails?.name}:</span>
                <span>{chat.latest_message.content?.slice(0, 20)}... </span>
              </>
            )}
          </small>
        )}
      </div>
      {online && (
        <div className="w-3 h-3 ring-2 ring-mycard-body rounded-full bg-green-500 bottom-3 left-9 absolute"></div>
      )}
    </div>
  );
}
