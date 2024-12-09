import instance from "./instance";

const url = "friend";

// Get the list of friends
export const getFriendListApi = (userId?: string) => {
    // Build the API URL dynamically based on whether userId is provided
    let apiUrl = `${url}/list`;

    // Add userId as a query parameter if it's provided
    if (userId) {
        apiUrl += `?userId=${userId}`;
    }

    return instance.get(apiUrl);
};

// Get the list of pending friend requests
export const getPendingRequestsApi = () =>
    instance.get(`${url}/pending-requests`);

// Get suggested friends
export const getSuggestFriendsApi = () =>
    instance.get(`${url}/suggest-friends`);

// Send a friend request
export const sendFriendRequestApi = (friendId: string) =>
    instance.post(`${url}/send-request/${friendId}`);

// Accept a friend request
export const acceptFriendRequestApi = (friendId: string) =>
    instance.patch(`${url}/accept-request/${friendId}`);

// Block a user
export const blockUserApi = ({
    friendId,
    reason,
}: {
    friendId: string;
    reason: string;
}) => instance.patch(`${url}/block/${friendId}`, { reason });
