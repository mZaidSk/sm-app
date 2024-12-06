import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import FollowButton from "./FollowButton";
import { HoverCardContent } from "@/components/ui/hover-card";
import AvatarContainer from "@/components/common/AvatarConatiner";

interface UserProfileCardProps {
    name: string;
    username: string;
    profileImage: string;
    isFollowing: boolean;
    noOfPost: number;
    noOfFriends: number;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
    name,
    username,
    profileImage,
    isFollowing,
    noOfPost,
    noOfFriends,
}) => {
    const [isFollowingvalue, setIsFollowing] = useState(isFollowing);

    // Handle "Unfollow" action
    const handleUnfollow = () => {
        setIsFollowing(false);
    };

    // Handle "Follow" action
    const handleFollow = () => {
        setIsFollowing(true);
    };

    return (
        <HoverCardContent className="w-80">
            {/* <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-4"> */}
            {/* Profile Section */}
            <div className="flex items-center space-x-4">
                <AvatarContainer
                    username={username}
                    profileImage={profileImage}
                />
                <div>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <p className="text-sm text-gray-500">{username}</p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="flex justify-around mt-3">
                <div className="text-center">
                    <h4 className="text-sm font-bold">{noOfPost}</h4>
                    <p className="text-sm text-gray-500">posts</p>
                </div>
                <div className="text-center">
                    <h4 className="text-sm font-bold">{noOfFriends}</h4>
                    <p className="text-sm text-gray-500">friends</p>
                </div>
            </div>

            {/* Buttons Section */}
            <div className="flex justify-between mt-4">
                <Button className="bg-zinc-700 text-white py-2 px-4 rounded-lg">
                    Message
                </Button>
                <FollowButton
                    isFollowing={isFollowingvalue}
                    onFollow={() => setIsFollowing(true)}
                    onUnfollow={() => setIsFollowing(false)}
                />
            </div>
            {/* </div> */}
        </HoverCardContent>
    );
};

export default UserProfileCard;
