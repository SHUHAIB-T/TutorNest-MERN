import { Dispatch, SetStateAction} from "react";
import { useAppSelector } from "../../app/store";
import { Ichat } from "../../types/chatandMessage";
import ChatCard from "../ChatCard/ChatCard";

interface prop {
  chat: Ichat[];
  setCurrentChat: Dispatch<SetStateAction<Ichat>>;
}
export default function SideBar({ chat, setCurrentChat }: prop) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <div className="flex relative flex-col items-center h-[80vh] overflow-hidden rounded-2xl bg-mycard-body w-72">
        <div className="w-full sticky top-0 p-3 bg-my-bg-dark">
          <div className="flex justify-between w-full text-white gap-3 sticky top-0">
            <h1 className="text-white mt-2 font-bold">CHATS</h1>
            <span className="font-bold cursor-pointer">...</span>
          </div>
        </div>
        <div
          id="scrol-y"
          className="grid w-full grid-cols-1 divide-y overflow-y-auto divide-violet-800"
        >
          {chat.length > 0 &&
            user &&
            chat.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <ChatCard chat={chat} user={user} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
