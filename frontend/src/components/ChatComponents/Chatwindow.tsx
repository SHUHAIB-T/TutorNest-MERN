import SendIcon from "@mui/icons-material/Send";
import EmojiPicker, { Theme } from "emoji-picker-react";
import {
  useRef,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useAppSelector } from "../../app/store";
import { format } from "timeago.js";
import Loader from "../Loader/Loader2/Loader";
import { IMessage, Ichat, bodydata } from "../../types/chatandMessage";
import {
  getMyMessages,
  sendMessage,
} from "../../features/message/mesageServiece";
import api from "../../API/api";
import Logo from "../../assets/Logo.svg";
import { SocketContext } from "../../contexts/SocketContext";

type userDtaType = {
  name: string;
  profile: string;
  userID: string;
};

type Prop = {
  currentChat: Ichat;
  messages: IMessage[];
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
};
export default function Chatwindow({
  currentChat,
  messages,
  setMessages,
}: Prop) {
  const socket = useContext(SocketContext);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const page = useRef<string | null>(null);
  const [fetchMessage, setFetchMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScroll, setIsscroll] = useState<boolean>(true);
  const [bodyData, setBodyData] = useState<bodydata>({
    chatId: currentChat._id,
    content: "",
    content_type: "TEXT",
  });

  const { user } = useAppSelector((state) => state.auth);
  const scroll = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<userDtaType>();
  useEffect(() => {
    if (fetchMessage && page && currentChat._id) {
      (async function () {
        try {
          setIsLoading(true);
          const data = await getMyMessages(currentChat._id, page.current);
          setMessages([...data.messages, ...messages]);
          setIsLoading(false);
          setIsscroll(false);
          setFetchMessage(false);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [fetchMessage, currentChat._id, messages, setMessages]);

  useEffect(() => {
    (async function () {
      const userId = currentChat.members?.find((e) => e !== user?._id);
      if (userId) {
        try {
          const { data } = await api.get(`/userProfile/${userId}`, {
            withCredentials: true,
          });
          setUserData(data.userProfile);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [currentChat.members, user?._id]);

  useEffect(() => {
    setBodyData({
      ...bodyData,
      chatId: currentChat._id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat._id]);

  useEffect(() => {
    if (isScroll) {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isScroll]);

  useEffect(() => {
    (async function () {
      if (bodyData.chatId && bodyData.content && bodyData.content_type) {
        const newMessage = await sendMessage(bodyData);
        setMessages([...messages, newMessage.newMessage]);
        socket?.current?.emit("send-new-message", newMessage.newMessage);
        setBodyData({
          ...bodyData,
          content: "",
        });
      }
    })();
  }, [bodyData, socket, messages, setMessages]);
  const handleSend = () => {
    if (message) {
      setBodyData({
        ...bodyData,
        content: message,
      });
      setMessage("");
      setIsscroll(true);
      setShowEmoji(false);
    }
  };
  const handleScrol = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (element.scrollTop === 0) {
      page.current = messages[0].createdAt as string;
      setFetchMessage(true);
    }
  };

  useEffect(() => {
    socket?.current?.on("recieve-message", (data: IMessage) => {
      setMessages([...messages, data]);
      setIsscroll(true);
    });
  }, [socket, messages, setMessages]);

  return (
    <>
      <div className="flex relative flex-col flex-grow max-w-5xl bg-mycard-body shadow-xl rounded-lg overflow-hidden">
        {currentChat._id ? (
          <>
            <div className="flex sticky top justify-between w-full bg-my-bg-dark p-2">
              <div className="flex gap-3 text-white">
                <img
                  className="w-10 rounded-full"
                  src={
                    userData?.profile
                      ? userData.profile
                      : "https://profilemagazine.com/wp-content/uploads/2020/04/Ajmere-Dale-Square-thumbnail.jpg"
                  }
                  alt=""
                />
                <h1 className="font-bold">{userData?.name}</h1>
              </div>
            </div>
            <div className="w-full items-center justify-center flex">
              {isLoading && <Loader />}
            </div>
            <div
              id="scrol-y"
              onScroll={(e) => handleScrol(e)}
              className="flex flex-col flex-grow h-0 p-4 overflow-auto"
            >
              {messages.length > 0 &&
                messages.map((e) =>
                  e.senderId !== user?._id ? (
                    <div className="flex w-full mt-2 space-x-3 max-w-xs">
                      <div>
                        <div className="bg-my-ring text-gray-200 p-3 rounded-r-2xl rounded-bl-2xl">
                          {e.content_type === "TEXT" && (
                            <p className="text-sm">{e.content}</p>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 leading-none">
                          {format(e.createdAt as string)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                      <div>
                        <div className="bg-my-bg-dark text-white p-3 rounded-l-2xl rounded-br-2xl">
                          {e.content_type === "TEXT" && (
                            <p className="text-sm">{e.content}</p>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 leading-none">
                          {format(e.createdAt as string)}
                        </span>
                      </div>
                    </div>
                  )
                )}
              <div ref={scroll} />
            </div>
            <div className="flex justify-end">
              <EmojiPicker
                theme={Theme.DARK}
                height={300}
                searchDisabled={true}
                open={showEmoji}
                lazyLoadEmojis={true}
                className="bg-my-bg-dark"
                onEmojiClick={(e) => {
                  setMessage((prev) => prev + e.emoji);
                }}
              />
            </div>
            <div className="bg-my-bg-dark p-4 flex gap-3 items-center">
              <input
                className="flex items-center text-white ring-1 ring-my-ring border-0 bg-my-input h-10 w-full rounded px-3 text-sm"
                type="text"
                placeholder="Type your message…"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setShowEmoji(false);
                }}
                onFocus={() => setShowEmoji(false)}
              />
              <span onClick={() => setShowEmoji((s) => !s)}>
                <EmojiEmotionsIcon className="text-my-ring cursor-pointer" />
              </span>
              <span onClick={handleSend}>
                <SendIcon className="text-my-ring cursor-pointer" />
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-full grid items-center justify-center">
              <div className="text-white flex items-center flex-col">
                <img src={Logo} alt="" />
                <h1>send and recieve messages...</h1>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
