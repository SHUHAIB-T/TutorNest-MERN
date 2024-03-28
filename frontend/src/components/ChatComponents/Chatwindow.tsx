import "./chatBox.css";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker, { Theme } from "emoji-picker-react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import DuoIcon from "@mui/icons-material/Duo";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
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
  deleteMessage,
} from "../../features/message/mesageServiece";
import api from "../../API/api";
import { SocketContext } from "../../contexts/SocketContext";
import { deleteImageFromFirebase, uploadImage } from "../util/uploadFirebase";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

type userDtaType = {
  name: string;
  profile: string;
  userID: string;
};

type Prop = {
  currentChat: Ichat;
  messages: IMessage[];
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
  setCurrentChat: Dispatch<SetStateAction<Ichat>>;
  role: string;
};
export default function Chatwindow({
  currentChat,
  messages,
  setMessages,
  setCurrentChat,
  role,
}: Prop) {
  const socket = useContext(SocketContext);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const page = useRef<string | null>(null);
  const [fetchMessage, setFetchMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScroll, setIsscroll] = useState<boolean>(true);
  const [uploadedIMG, setUplaodedIMG] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [deleteMessageId, setDeleteMessageId] = useState<string>("");
  const [bodyData, setBodyData] = useState<bodydata>({
    chatId: currentChat._id,
    content: "",
    content_type: "TEXT",
  });

  const { user } = useAppSelector((state) => state.auth);
  const scroll = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<userDtaType>();

  // fetching messages
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

  // fetching user details
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

  // sending message
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

  // deleting messages
  useEffect(() => {
    (async function () {
      if (deleteMessageId) {
        const data = await deleteMessage(deleteMessageId);
        socket?.current?.emit("deleteMessage", data.deletedMessage);
        setMessages(
          messages.map((item) => {
            if (item._id === deleteMessageId) {
              item.isDelete = true;
            }
            return item;
          })
        );
        setDeleteMessageId("");
      }
    })();
  }, [socket, deleteMessageId, messages, setMessages]);

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

  useEffect(() => {
    socket?.current?.on("delete-message", (data: IMessage) => {
      setMessages(
        messages.map((item) => {
          if (item._id === data._id) {
            item.isDelete = true;
          }
          return item;
        })
      );
    });
  }, [socket, messages, setMessages]);

  const handeletemessage = (type: string, url: string, chatId: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      text: "are you sure want to delete this message?",
      showCancelButton: true,
      confirmButtonText: "yes delete",
    }).then((result) => {
      if (result.isConfirmed) {
        (async function () {
          if (type === "MEDIA") {
            await deleteImageFromFirebase(url);
            setDeleteMessageId(chatId);
          } else {
            setDeleteMessageId(chatId);
          }
        })();
      }
    });
  };

  return (
    <>
      <div className="flex relative flex-col h-[80vh] flex-grow w-full bg-mycard-body shadow-xl rounded-lg overflow-hidden">
        <>
          <div className="flex sticky top justify-between items-center w-full bg-my-bg-dark p-2">
            <div className="flex gap-3 items-center text-white">
              <span
                onClick={() => setCurrentChat({ _id: "" })}
                className="md:hidden hover:bg-mycard-body cursor-pointer w-10 h-10 flex items-center justify-center rounded-full"
              >
                <ArrowLeftIcon fontSize="large" />
              </span>
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
            <Link
              to={
                role === "STUDENT"
                  ? `/student/video-chat/${currentChat._id}`
                  : `/tutor/video-chat/${currentChat._id}`
              }
              className="text-white"
            >
              <DuoIcon fontSize="large" />
            </Link>
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
                        {e.content_type === "TEXT" && !e.isDelete && (
                          <p className="text-sm">{e.content}</p>
                        )}
                        {e.content_type === "MEDIA" && !e.isDelete && (
                          <img className="max-w-50" src={e.content} alt="" />
                        )}
                        {e.isDelete && (
                          <p className="italic text-gray-400">
                            this message has been deleted
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        {format(e.createdAt as string)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full mt-2 message-box space-x-3 max-w-xs ml-auto justify-end">
                    <div className="flex">
                      {!e.isDelete && (
                        <button
                          onClick={() => {
                            if (e.content_type && e.content && e._id) {
                              handeletemessage(
                                e.content_type,
                                e.content,
                                e._id
                              );
                            }
                          }}
                          className="text-my-ring delete-btn hover:text-white mb-5"
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      )}
                      <div>
                        <div className="bg-my-bg-dark text-white p-3 rounded-l-2xl rounded-br-2xl">
                          {e.content_type === "TEXT" && !e.isDelete && (
                            <p className="text-sm">{e.content}</p>
                          )}
                          {e.content_type === "MEDIA" && !e.isDelete && (
                            <img className="max-w-50" src={e.content} alt="" />
                          )}
                          {e.isDelete && (
                            <p className="italic text-gray-400">
                              this message has been deleted
                            </p>
                          )}
                        </div>

                        <span className="text-xs text-gray-500 leading-none">
                          {format(e.createdAt as string)}
                        </span>
                      </div>
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
          {showInput && (
            <div className="bg-primary">
              <input
                onChange={(e) =>
                  e.target.files &&
                  (async function () {
                    if (e.target.files) {
                      setUplaodedIMG(await uploadImage(e.target.files[0]));
                      setShowInput(false);
                    }
                  })()
                }
                type="file"
              />
            </div>
          )}
          {uploadedIMG && (
            <div className="max-w-96 p-3 bg-secondary rounded-md">
              <span className="flex text-white justify-end p-2">
                <div
                  onClick={() => {
                    (async function () {
                      await deleteImageFromFirebase(uploadedIMG);
                      setUplaodedIMG("");
                    })();
                  }}
                  className="hover:bg-primary cursor-pointer rounded-md"
                >
                  <CloseIcon />
                </div>
              </span>
              <img className="" src={uploadedIMG} alt="" />
              <span className="flex w-full justify-end items-center p-2">
                <p className="text-gray-400 me-3">Send image</p>
                <div
                  onClick={() => {
                    setBodyData({
                      ...bodyData,
                      content_type: "MEDIA",
                      content: uploadedIMG,
                    });
                    setUplaodedIMG("");
                  }}
                  className="hover:bg-my-bg-dark cursor-pointer py-1 px-2 rounded-lg"
                >
                  <SendIcon className="text-my-ring cursor-pointer" />
                </div>
              </span>
            </div>
          )}
          <div className="bg-my-bg-dark p-4 flex gap-3 items-center">
            <div
              onClick={() => setShowInput((prev) => !prev)}
              className="w-10 h-10 items-center cursor-pointer justify-center flex rounded-full hover:bg-secondary"
            >
              <AttachFileIcon className="text-my-ring" />
            </div>
            <input
              className="flex items-center text-white ring-1 ring-my-ring border-0 bg-my-input h-10 w-full rounded px-3 text-sm"
              type="text"
              placeholder="Type your message…"
              value={message}
              disabled={uploadedIMG ? true : false}
              onChange={(e) => {
                setMessage(e.target.value);
                setShowEmoji(false);
                setShowInput(false);
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
      </div>
    </>
  );
}
