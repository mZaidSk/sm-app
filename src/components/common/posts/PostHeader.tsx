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
import { User, Users, Flag, Plus } from "lucide-react"; // Icons for follow and report
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
                <Avatar className="z-0">
                    <AvatarImage
                        src={profileImage}
                        alt={username}
                        className="z-0"
                    />
                    <AvatarFallback>{username?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold">{name}</div>
                    <div className="text-sm text-gray-500">{username}</div>
                </div>
            </div>

            {/* Dropdown Menu for Follow and Report options */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-gray-200">
                        {/* Menu Icon */}
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
