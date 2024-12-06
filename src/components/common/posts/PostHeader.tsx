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
interface PostHeaderProps {
    name: string;
    username: string;
    profileImage: string;
    isFollowing: boolean;
}

const PostHeader: React.FC<PostHeaderProps> = ({
    name,
    username,
    profileImage,
    isFollowing,
}) => {
    return (
        <div className="flex justify-between items-center w-full">
            {/* Profile Picture and Name */}
            <div className="flex items-center space-x-3">
                <AvatarContainer
                    username={username}
                    profileImage={profileImage}
                />
                <HoverCardComponent
                    name={name}
                    username={username}
                    profileImage={profileImage}
                    isFollowing={isFollowing}
                    noOfPost={1}
                    noOfFriends={12}
                />
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
