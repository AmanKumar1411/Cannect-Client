import { useAppStore } from "@/stores";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactContainer from "./components/contact-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chats-container";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!userInfo.profileSetup) {
  //     toast("Please setup Profile to move forward");
  //     navigate("/profile");
  //   }
  // }, [userInfo, navigate]);

  return (
    <>
      <div
        className="flex h-[100vh] text-white
       overflow-hidden"
      >
        <ContactContainer />
        {/* <EmptyChatContainer /> */}
        <ChatContainer />
      </div>
    </>
  );
};

export default Chat;






















































































// import React, { useState } from "react";
// import dummyData from "./components/dummyData"; // Importing the dummyData

// const users = [
//   {
//     id: 1,
//     name: "merruAnuj",
//     messages: ["Hi!", "How are you?", "See you later."],
//   },
//   {
//     id: 2,
//     name: "lodnit__",
//     messages: ["Hey there!", "What’s up?", "Let’s meet!"],
//   },
//   {
//     id: 3,
//     name: "yissu-!",
//     messages: ["Hello!", "Good morning!", "Take care."],
//   },
// ];

// const ChatPage = () => {
//   const [activeUser, setActiveUser] = useState(users[0]); // Active user state
//   const [inputMessage, setInputMessage] = useState(""); // Input message state

//   const sendMessage = () => {
//     if (inputMessage.trim() === "") return; // Prevent empty messages

//     const newMessage = inputMessage.toLowerCase(); // User message
//     const updatedUsers = users.map((user) =>
//       user.id === activeUser.id
//         ? { ...user, messages: [...user.messages, newMessage] }
//         : user
//     );

//     setActiveUser({
//       ...activeUser,
//       messages: [...activeUser.messages, newMessage],
//     });
//     setInputMessage(""); // Clear input after sending

//     // Simulate a bot response using dummyData.json
//     setTimeout(() => {
//       const reply =
//         dummyData.responses[newMessage] ||
//         "Sorry, I don’t have a reply for that!";
//       setActiveUser((prevUser) => ({
//         ...prevUser,
//         messages: [...prevUser.messages, reply],
//       }));
//     }, 1000); // Simulate delay in response
//   };

//   return (
//     <div className="flex h-screen bg-black text-white">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-gray-700 p-4 text-center">
//         <h2 className="text-3xl text-green-500 font-bold mb-6">Cannect</h2>
//         <div className="space-y-4">
//           {users.map((user) => (
//             <div
//               key={user.id}
//               className={`p-3 rounded-lg cursor-pointer ${
//                 activeUser.id === user.id
//                   ? "bg-gray-700"
//                   : "bg-gray-800 hover:bg-gray-700"
//               }`}
//               onClick={() => setActiveUser(user)}
//             >
//               {user.name}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Message Container */}
//       <div className="flex flex-col w-3/4 p-4 bg-black">
//         <div className="flex-grow overflow-y-auto mb-4">
//           {activeUser.messages.map((msg, index) => (
//             <div key={index} className="mb-2 p-3 bg-gray-700 rounded-lg">
//               {msg}
//             </div>
//           ))}
//         </div>
//         <div className="flex items-center bg-black p-4 rounded-lg">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-grow p-2 bg-gray-900 rounded-lg text-white placeholder-gray-400"
//           />
//           <button
//             onClick={sendMessage}
//             className="ml-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
