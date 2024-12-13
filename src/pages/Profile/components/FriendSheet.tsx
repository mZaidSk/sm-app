import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import FollowButton from "@/pages/Home/components/FollowButton"; // Adjust import if necessary
import AvatarContainer from "@/components/common/AvatarConatiner";

const FriendsSheet: React.FC<any> = ({ friendsList }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <span className="cursor-pointer text-lg font-medium hover:text-blue-600 transition-colors">
                    Friend
                </span>
            </SheetTrigger>
            <SheetContent className="max-w-lg mx-auto flex flex-col overflow-hidden  bg-white shadow-md">
                {/* Simplified Header */}
                <SheetHeader className="p-3 border-b border-gray-200">
                    <SheetTitle className="text-xl font-semibold text-gray-800">
                        Friend List
                    </SheetTitle>
                </SheetHeader>

                {/* Friends List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {friendsList.length > 0 ? (
                        friendsList.map((friend: any) => (
                            <div
                                key={friend.username}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-200 hover:shadow transition-shadow duration-200"
                            >
                                {/* Avatar and Friend Info */}
                                <div className="flex items-center space-x-4">
                                    <AvatarContainer
                                        username={friend.username}
                                        profileImage={friend.profileImage}
                                    />
                                    <div>
                                        <p className="text-base font-medium text-gray-900">
                                            {friend.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            @{friend.username}
                                        </p>
                                    </div>
                                </div>

                                {/* Follow Button */}
                                {/* <FollowButton
                                    isFollowing={friend.isFriend}
                                    onFollow={() => onFollow(friend.username)}
                                    onUnfollow={() =>
                                        onUnfollow(friend.username)
                                    }
                                /> */}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-sm text-gray-600">
                            No friends found.
                        </p>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default FriendsSheet;
