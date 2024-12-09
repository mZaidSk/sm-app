import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Utility function to map friend list data
export const transformFriendListData = (
    data: Array<any>,
    loggedInUserId: string,
    friendsIds: Set<string | undefined> // IDs of the logged-in user's friends
) =>
    data.map((friend) => {
        const otherUser =
            friend.user.id === loggedInUserId ? friend.friend : friend.user;
        return {
            username: otherUser.username,
            name: `${otherUser.firstName} ${otherUser.lastName}`,
            profileImage: otherUser.profilePictureUrl,
            isFriend: friendsIds.has(otherUser.id), // Check if already a friend
        };
    });
