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
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import { getFriendList, removeFriend } from "@/store/slice/FriendSlice";
import { transformFriendListData } from "@/lib/utils";

const FriendsSheet: React.FC<any> = ({ id }) => {
    const dispatch = useDispatch<AppDispatch>();

    const authUser = useSelector((state: RootState) => state.auth.user || {});
    const friendList = useSelector(
        (state: RootState) => state.friend.friendList
    );
    console.log(friendList);

    const handleOpenChange = async () => {
        await dispatch(getFriendList({ userId: id || undefined }));
    };

    const removeUserFriend = async (requestId: string) => {
        await dispatch(removeFriend({ requestId }));
        await dispatch(getFriendList({ userId: id || undefined }));
    };

    return (
        <Sheet onOpenChange={() => handleOpenChange()}>
            <SheetTrigger asChild>
                <span className="cursor-pointer text-md font-medium hover:text-blue-600 transition-colors">
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
                <div className="flex-1 overflow-y-auto p-1 space-y-2">
                    {transformFriendListData(friendList, id, new Set([id]))
                        .length > 0 ? (
                        transformFriendListData(
                            friendList,
                            id,
                            new Set([id])
                        ).map((friend: any) => (
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
                                    <Link to={`/profile/${friend.id}`}>
                                        <p className="text-base font-medium text-gray-900">
                                            {friend.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            @{friend.username}
                                        </p>
                                    </Link>
                                </div>

                                {authUser.id == id && (
                                    <Button
                                        onClick={() =>
                                            removeUserFriend(friend.id)
                                        }
                                    >
                                        UnFriend
                                    </Button>
                                )}

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
