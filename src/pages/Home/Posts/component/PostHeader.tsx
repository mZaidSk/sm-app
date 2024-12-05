import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Users, Flag, Plus } from "lucide-react";  // Icons for follow and report

const PostHeader = () => {
  const isFollowing = false;

  return (
    <div className="flex justify-between items-center w-full">
      {/* Profile Picture and Name */}
      <div className="flex items-center space-x-3">
        <Avatar className="z-0">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="z-0" />
          <AvatarFallback >CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">FirstName LastName</div>
          <div className="text-sm text-gray-500">@Username</div>
        </div>
      </div>

      {/* Dropdown Menu for Follow and Report options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {isFollowing ? (
              <Users className="mr-2" />
            ) : (
              <Plus className="mr-2" />
            )}
            <span>{isFollowing ? "Unfollow" : "Follow"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Flag className="mr-2" />
            <span>Report</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PostHeader;
