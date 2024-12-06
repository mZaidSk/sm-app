import instance from "./instance";

const url = "friend";

// Get the list of friends
export const getFriendList = () => instance.get(`${url}/list`);

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
