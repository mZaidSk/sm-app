import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getSuggestFriends } from "@/store/slice/FriendSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface SuggestedUserCardProps {
    user: any;
    followers: string;
}

const SuggestedUserCard: React.FC<SuggestedUserCardProps> = ({ user }) => (
    <div className="flex items-center justify-between w-full max-w-md py-4 px-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
        {/* User Info Section */}
        <div className="flex items-center space-x-4 flex-1">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <Avatar className="w-full h-full">
                    <AvatarImage
                        src={user.profilePictureUrl}
                        alt={`Profile picture of ${user.firstName}`}
                        className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="text-gray-500 font-medium text-xl">
                        {user.firstName[0]}
                    </AvatarFallback>
                </Avatar>
            </div>
            <Link to={`profile/${user?.id}`}>
                <div className="truncate">
                    <p className="text-base font-semibold text-gray-900 truncate">
                        {user.firstName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                        @{user.username}
                    </p>
                </div>
            </Link>
        </div>

        {/* Follow Button */}
        <Button
            aria-label={`Follow ${user.firstName}`}
            className="text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ml-4"
        >
            Friend
        </Button>
    </div>
);

const SuggestedUsers = () => {
    const dispatch = useDispatch<AppDispatch>();
    const authUserSelector = useSelector((state: RootState) => state.auth.user);
    const suggestFriendListSelector = useSelector(
        (state: RootState) => state.friend.suggestFriendList || []
    );

    const fetchSuggestedFriend = () => {
        dispatch(getSuggestFriends());
    };

    useEffect(() => {
        fetchSuggestedFriend();
    }, []);

    return (
        <div className="w-full max-w-lg mx-auto bg-white px-6 py-6 mt-6 rounded-lg shadow-xl sticky top-24 space-y-6">
            {/* Profile Section */}
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    <Avatar className="z-0 w-full h-full">
                        <AvatarImage
                            src={authUserSelector?.profilePictureUrl}
                            alt={authUserSelector?.firstName}
                            className="object-cover w-full h-full"
                        />
                        <AvatarFallback>
                            {authUserSelector?.username?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <Link to={`profile`}>
                    <div>
                        <p className="text-lg font-bold text-gray-900">
                            {authUserSelector?.firstName}
                        </p>
                        <p className="text-sm text-gray-500">
                            @{authUserSelector?.username}
                        </p>
                    </div>
                </Link>
            </div>

            {/* Suggested Users Section */}
            <div className="space-y-4 w-full max-w-lg mx-auto">
                <p className="text-md font-semibold text-gray-900">
                    Suggested for you
                </p>
                {suggestFriendListSelector.length > 0 ? (
                    suggestFriendListSelector.map((user, index) => (
                        <SuggestedUserCard
                            key={index}
                            user={user}
                            followers={user?.followers}
                        />
                    ))
                ) : (
                    <p className="text-sm text-gray-500">
                        No suggestions available at the moment.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SuggestedUsers;
