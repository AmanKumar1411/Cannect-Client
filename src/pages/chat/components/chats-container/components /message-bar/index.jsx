import EmojiPicker from "emoji-picker-react";
import { useRef, useState, useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

const MessageBar = () => {
  const emojiRef = useRef();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);
  
  const handleAddEmoji = (emoji) => {
    setMessage((prevMsg) => prevMsg + emoji.emoji);
  };

  const handleSendMessage = async () => {};

  return (
    <div className="h-[10vh] bg-black flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-3 p-2">
        <input
          type="text"
          placeholder="Enter the message"
          className="flex-1 p-3 bg-transparent text-white rounded-md focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>

        <div className="relative" ref={emojiRef}>
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => setEmojiPickerOpen((prev) => !prev)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          {emojiPickerOpen && (
            <div className="absolute bottom-16 right-0">
              <EmojiPicker
                theme="dark"
                onEmojiClick={handleAddEmoji}
                autoFocusSearch={false}
              />
            </div>
          )}
        </div>
      </div>
      <button
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 focus:border-none
      hover:bg-[#741bda] focus:outline-none focus:text-white duration-300 transition-all"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
