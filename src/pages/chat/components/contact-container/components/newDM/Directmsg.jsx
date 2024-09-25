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
import { animationDefaultOptions } from "@/lib/utils";
import apiClient from "@/lib/api-client";
import { SEARCH_CONTACT_ROUTE } from "@/utils/containts";
import { Avatar } from "@/components/ui/avatar";
import { useAppStore } from "@/stores";
const Directmsg = () => {
  const { setselectedChatType, setselectedChatData } = useAppStore();
  const [openNewContact, setopenNewContact] = useState(false);
  const [SearchContacts, setSearchContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.contacts) {
          setSearchContacts(response.data.contacts);
        }
      } else {
        setSearchContacts([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const searchNewContacts = (contact) => {
    setopenNewContact(false);
    setselectedChatData(contact);
    setselectedChatType("contact");
    setSearchContacts([]);
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
          <div>
            <Input
              placeholder="Search contact"
              className=" rounded-lg p-3 bg-[#2c2e3b] border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[250px]">
            <div>
              {SearchContacts.map((contact) => (
                <div
                  key={contact.id} // Ensure this is unique for each contact
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() => searchNewContacts(contact)}
                >
                  <div>
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                      {contact.image ? (
                        <AvatarImage
                          src={`${HOST}/${contact.image}`}
                          alt="profile-pic"
                          className="object-cover w-full h-full bg-black"
                        />
                      ) : (
                        <div
                          className={`uppercase h-12 w-12 text-lg border-[5px] flex items-center justify-center rounded-full text-white`}
                        >
                          {contact.firstName
                            ? contact.firstName.charAt(0)
                            : contact.email.charAt(0)}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex flex-col ">
                    <span>
                      {" "}
                      {contact.firstName && contact.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : contact.email}
                    </span>
                    <span className="text-sm">{contact.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          {SearchContacts.length === 0 && (
            <div className="flex-1 md:bg-[#032221] md:flex-col justify-center items-center flex transition-all duration-1000">
              {animationDefaultOptions.animationData ? (
                <Lottie
                  isClickToPauseDisabled={true}
                  height={100}
                  width={100}
                  options={animationDefaultOptions}
                />
              ) : (
                <p>No animation data found</p>
              )}
              <div className="text-opacity-80 text-white flex-col gap-10 items-center mt-10 lg:text-2xl text-3xl transition-all duration-300 text-center">
                <h1 className="sofadi-one-regular">
                  Find<span className="text-green-600">!</span>
                </h1>
                <h3>Your Friends</h3>
                <span className="text-green-600 playpen-sans-medium">
                  Cannect
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Directmsg;
