import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Lottie from "react-lottie";
import { IoPersonAddSharp } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useAppStore } from "@/stores";

const dummyUsers = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com" },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Williams",
    email: "alice@example.com",
  },
];

const responses = {
  hii: "hello",
  hello: "Hi! How's your day going?",
  "how are you": "I'm fine, thanks for asking!",
  "what's up": "Not much, just chatting with you!",
  bye: "Goodbye! See you later!",
  hii: "hello",
  hello: "Hi! How's your day going?",
  "how are you": "I'm fine, thanks for asking!",
  "what's up": "Not much, just chatting with you!",
  bye: "Goodbye! See you later!",
  "good morning": "Good morning! Hope you have a great day!",
  "good night": "Good night! Sleep tight!",
  "thank you": "You're welcome!",
  "what are you doing": "Just chatting and helping out!",
  "where are you from": "I’m from the virtual world!",
  "what's your name": "I'm your friendly chat assistant!",
  "do you like music": "I love all kinds of music! What about you?",
  "how's the weather":
    "I don't feel the weather, but I hope it's nice where you are!",
  "i'm bored": "Let's play a game or chat! What would you like to do?",
  "tell me a joke":
    "Why don't skeletons fight each other? Because they don't have the guts!",
  "do you like sports": "I enjoy virtual sports! How about you?",
  "what's your favorite color": "I like all colors, but green is pretty cool!",
  "how old are you": "I was created recently, so I’m always young at heart!",
  "are you real": "I'm as real as a virtual assistant can be!",
};

const Directmsg = () => {
  const { setselectedChatType, setselectedChatData } = useAppStore();
  const [openNewContact, setopenNewContact] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);

    const botReply =
      responses[input.toLowerCase()] || "Sorry, I don't understand that!";
    setTimeout(() => {
      setMessages([...newMessages, { text: botReply, sender: "bot" }]);
    }, 1000);

    setInput("");
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <IoPersonAddSharp
              className=" font-light text-opacity-90  text-start cursor-pointer "
              onClick={() => {
                setopenNewContact(true);
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContact} onOpenChange={setopenNewContact}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please Select a Contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[250px]">
            <div>
              {dummyUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() => {
                    setSelectedUser(user);
                    setMessages([]);
                    setopenNewContact(false);
                  }}
                >
                  <div>
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                      <div className="uppercase h-12 w-12 text-lg border-[5px] flex items-center justify-center rounded-full text-white">
                        {user.firstName.charAt(0)}
                      </div>
                    </Avatar>
                  </div>
                  <div className="flex flex-col ">
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                    <span className="text-sm">{user.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {selectedUser && (
        <div className="fixed bottom-0 right-0 w-[400px] bg-[#181920] text-white p-4">
          <div className="flex items-center justify-between">
            <h3>
              {selectedUser.firstName} {selectedUser.lastName}
            </h3>
            <button onClick={() => setSelectedUser(null)}>Close</button>
          </div>
          <ScrollArea className="h-[250px] mt-4">
            <div className="flex flex-col gap-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.sender === "user" ? "self-end" : "self-start"
                  } p-2 bg-[#2c2e3b] rounded-lg`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Directmsg;
