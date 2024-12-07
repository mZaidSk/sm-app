type FollowHandler = (username: string) => void;

// Props for FriendsSheet
interface FriendsSheetProps {
    friendsList: Array<{
        username: string;
        name: string;
        profileImage: string;
        isFollowing: boolean;
    }>;
    onFollow: FollowHandler;
    onUnfollow: FollowHandler;
}

import AvatarContainer from "@/components/common/AvatarConatiner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import FollowButton from "@/pages/Home/components/FollowButton";
// FriendsSheet.jsx
import React from "react";

const FriendsSheet :React.FC<FriendsSheetProps> = ({ friendsList, onFollow, onUnfollow }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <span className="hover:text-gray-900 cursor-pointer">Friends</span>
            </SheetTrigger>
            <SheetContent className="flex flex-col h-[100vh]">
                <SheetHeader className="justify-center">
                    <SheetTitle>Friends</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto space-y-2 p-2 rounded-lg bg-slate-100">
                    {friendsList.map((friend) => (
                        <div
                            key={friend.username}
                            className="comment-item border-b p-3 flex space-x-2 rounded-lg shadow-md bg-white"
                        >
                            {/* User Profile */}
                            <AvatarContainer
                                username={friend.username}
                                profileImage={friend.profileImage}
                            />
                            <div className="flex-1">
                                <div className="ml-3">
                                    {/* Name */}
                                    <p className="font-semibold">{friend.name}</p>
                                    {/* Username */}
                                    <p className="text-xs text-gray-500">{friend.username}</p>
                                </div>
                            </div>
                            {/* Friend Button */}
                            <FollowButton
                                isFollowing={friend.isFollowing}
                                onFollow={() => onFollow(friend.username)}
                                onUnfollow={() => onUnfollow(friend.username)}
                            />
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default FriendsSheet;

