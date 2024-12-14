import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ChatSidebarUserProps {
  profileImage: string;
  username: string;
  firstName: string;
  lastName: string;
  lastDate: string;
  msg: string;
}

const ChatSidebarUser: React.FC<ChatSidebarUserProps> = ({
  profileImage,
  username,
  firstName,
  lastName,
  lastDate,
  msg,
}) => {
  //   const formattedDate = lastDate
  //     ? lastDate.toLocaleDateString("en-GB", {
  //         day: "2-digit",
  //         month: "short",
  //         year: "numeric",
  //       })
  //     : "N/A";

  return (
    <div className="w-full rounded-md">
      <div className="flex items-start gap-2 p-2 rounded-md">
        {/* Profile Section */}
        <div className="flex items-start gap-3 w-full">
          <Avatar className="w-12 h-12">
            <AvatarImage src={profileImage} alt="Profile Picture" />
            <AvatarFallback>
              {username ? username.charAt(0).toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex flex-row gap-1">
              <span className="font-medium">{firstName}</span>
              <span className="font-medium">{lastName}</span>
            </div>
            <span className="text-xs block text-gray-600">{username}</span>
            <div className="pt-1  text-sm font-medium">{msg}</div>
          </div>
        </div>

        {/* Last Message Date */}
        <span className="ml-auto text-xs text-gray-500">{lastDate}</span>
      </div>
    </div>
  );
};

export default ChatSidebarUser;
