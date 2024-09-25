import { useAppStore } from "@/stores";
import ContactContainer from "./components/contact-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chats-container";

const Chat = () => {
  const { selectChatType } = useAppStore();

  return (
    <>
      <div
        className="flex h-[100vh] text-white
       overflow-hidden"
      >
        <ContactContainer />
        {selectChatType === undefined ? (
          <EmptyChatContainer />
        ) : (
          <ChatContainer />
        )}
      </div>
    </>
  );
};

export default Chat;

