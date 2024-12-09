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

type FollowHandler = (username: string) => void;
// Props for FriendsSheet
interface FriendsSheetProps {
    friendsList: Array<{
        username: string;
        name: string;
        profileImage: string;
        isFriend: boolean;
    }>;
    onFollow: FollowHandler;
    onUnfollow: FollowHandler;
}

const FriendsSheet: React.FC<FriendsSheetProps> = ({
    friendsList,
    onFollow,
    onUnfollow,
}) => {
    console.log(friendsList);
    return (
        <Sheet>
            <SheetTrigger asChild>
                <span className="cursor-pointer text-lg font-medium hover:text-primary transition-colors">
                    Friends
                </span>
            </SheetTrigger>
            <SheetContent className="flex flex-col max-w-xl mx-auto overflow-hidden">
                <SheetHeader className="flex justify-between items-center">
                    <SheetTitle className="text-2xl font-bold">
                        Friends
                    </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-slate-50 rounded-lg shadow-md">
                    {friendsList.length > 0 ? (
                        friendsList.map((friend) => (
                            <div
                                key={friend.username}
                                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex items-center space-x-4">
                                    <AvatarContainer
                                        username={friend.username}
                                        profileImage={friend.profileImage}
                                    />
                                    <div>
                                        <p className="text-lg font-semibold">
                                            {friend.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {friend.username}
                                        </p>
                                    </div>
                                </div>

                                <FollowButton
                                    isFollowing={friend.isFriend}
                                    onFollow={() => onFollow(friend.username)}
                                    onUnfollow={() =>
                                        onUnfollow(friend.username)
                                    }
                                />
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
