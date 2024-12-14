import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";

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
                        <span className="text-xs block text-gray-600">
                            @{username}
                        </span>
                        {msg && (
                            <div className="pt-1  text-sm font-medium">
                                {msg}
                            </div>
                        )}
                    </div>
                </div>

                {/* Last Message Date */}
                {lastDate && (
                    <span className="ml-auto text-xs text-gray-500">
                        {formatDistanceToNow(new Date(lastDate), {
                            addSuffix: true,
                        })}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ChatSidebarUser;
