import SendIcon from "@mui/icons-material/Send";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

export default function Chatwindow() {
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="flex relative flex-col flex-grow max-w-5xl bg-mycard-body shadow-xl rounded-lg overflow-hidden">
        <div className="flex sticky top justify-between w-full bg-my-bg-dark p-2">
          <div className="flex gap-3 text-white">
            <img
              className="w-10 rounded-full"
              src="https://profilemagazine.com/wp-content/uploads/2020/04/Ajmere-Dale-Square-thumbnail.jpg"
              alt=""
            />
            <h1 className="font-bold">Amarnath A s</h1>
          </div>
        </div>
        <div
          id="scrol-y"
          className="flex flex-col flex-grow h-0 p-4 overflow-auto"
        >
          <div className="flex w-full mt-2 space-x-3 max-w-xs">
            <div>
              <div className="bg-my-ring text-gray-200 p-3 rounded-r-2xl rounded-bl-2xl">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
          </div>
          <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div className="bg-my-bg-dark text-white p-3 rounded-l-2xl rounded-br-2xl">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
          </div>
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
          <SendIcon className="text-my-ring cursor-pointer" />
        </div>
      </div>
    </>
  );
}
