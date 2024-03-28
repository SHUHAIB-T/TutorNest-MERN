import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/ChatComponents/SideBar";
import Chatwindow from "../../components/ChatComponents/Chatwindow";
import StudentNav from "../../components/NavBar/StudentNav";
import { useEffect, useState, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getAllChats } from "../../features/chat/chatServieces";
import { getMyMessages } from "../../features/message/mesageServiece";
import { IMessage, Ichat } from "../../types/chatandMessage";
import { SocketContext } from "../../contexts/SocketContext";
import Logo from "../../assets/Logo.svg";

type Prop = {
  role: string;
};
export default function ChatPage({ role }: Prop) {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const { chat } = useAppSelector((state) => state.chat);
  const [currentChat, setCurrentChat] = useState<Ichat>({ _id: "" });
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    socket?.current?.on("getUsers", (users) => {
      console.log(users);
    });
    dispatch(getAllChats());
  }, [dispatch, socket]);

  useEffect(() => {
    if (currentChat._id) {
      (async function () {
        try {
          const messages = await getMyMessages(currentChat._id, null);
          setMessages(messages.messages);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [currentChat._id]);

  return (
    <>
      <div className="bg-secondary pb-10">
        {role === "TUTOR" && <NavBar role="TUTOR" />}
        {role === "STUDENT" && <StudentNav />}
        <div className="p-5 flex gap-6">
          <div className={`md:w-72 ${currentChat._id ? "hidden" : "block"} md:inline-block`}>
            <SideBar chat={chat} setCurrentChat={setCurrentChat} />
          </div>
          <div className="w-full h-[80vh]">
            {currentChat._id ? (
              <Chatwindow
                messages={messages}
                setMessages={setMessages}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                role={role}
              />
            ) : (
              <div className="w-full hidden  h-full md:grid items-center justify-center">
                <div className="text-white flex items-center flex-col">
                  <img src={Logo} alt="" />
                  <h1>send and recieve messages...</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
