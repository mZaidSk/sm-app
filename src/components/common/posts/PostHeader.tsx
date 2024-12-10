import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Users, Flag, Plus, EllipsisVertical } from "lucide-react";
import HoverCardComponent from "../HoverCardComponent";
import AvatarContainer from "../AvatarConatiner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
interface PostHeaderProps {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  isFollowing: boolean;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  id,
  name,
  username,
  profileImage,
  isFollowing,
}) => {
  const authUserSelector = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex justify-between items-center w-full">
      {/* Profile Picture and Name */}
      <div className="flex items-center space-x-3">
        <AvatarContainer username={username} profileImage={profileImage} />
        <Link
          to={`/profile/${authUserSelector.id === id ? "" : id}`}
          className="flex flex-col"
        >
          <span className="font-semibold">{name}</span>
          <span className="text-sm text-gray-500">@{username}</span>
        </Link>
      </div>

      {/* Dropdown Menu for Follow and Report options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <EllipsisVertical />
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
