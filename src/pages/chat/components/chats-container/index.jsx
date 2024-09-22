import ChatHeader from "./components /chat-header";
import MessageBar from "./components /message-bar";
import MessageContainer from "./components /message-container";

const ChatContainer = () => {
  return (
    <>
      <div className="fixed top-0 h-[100vh] w-[100vw] bg-black flex flex-col md:static md:flex-col-1">
        {/* Now the components will render properly */}
        <ChatHeader />
        <MessageContainer />
        <MessageBar />
      </div>
    </>
  );
};

export default ChatContainer;
