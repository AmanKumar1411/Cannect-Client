import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/stores";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/containts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaEdit } from "react-icons/fa";
const ProfileInfo = () => {
  const { userInfo } = useAppStore();

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between p-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12  rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile-pic"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12  text-lg border-[5px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )} text-white`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.charAt(0)
                  : userInfo.email.charAt(0)}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaEdit className="text-purple-500 text-xl font-medium" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
