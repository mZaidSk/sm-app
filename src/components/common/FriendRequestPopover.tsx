import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { UserPlus, CheckCircle, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { format } from "date-fns";
import {
    acceptFriendRequest,
    getPendingRequests,
} from "@/store/slice/FriendSlice";

function FriendRequestPopover() {
    const dispatch = useDispatch<AppDispatch>();
    const authUserSelector = useSelector((state: RootState) => state.auth.user);
    const pendingRequestList = useSelector(
        (state: RootState) => state.friend.pendingFriendList
    );

    const incomingRequests = pendingRequestList.filter(
        (request) => request.user.id !== authUserSelector.id
    );

    const outgoingRequests = pendingRequestList.filter(
        (request) => request.user.id === authUserSelector.id
    );

    const handleAcceptFriendRequest = async (friendId: string) => {
        await dispatch(acceptFriendRequest({ friendId }));
        dispatch(getPendingRequests());
    };

    return (
        <div className="relative inline-block">
            {/* Icon with Badge */}
            <Popover>
                <PopoverTrigger asChild>
                    <div className="relative cursor-pointer">
                        <UserPlus className="text-gray-500 w-6 h-6" />
                        <Badge
                            variant="default"
                            className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center text-xs font-bold"
                        >
                            {pendingRequestList.length}
                        </Badge>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-white p-4 rounded-md shadow-md space-y-4">
                    {/* Incoming Friend Requests */}
                    <div>
                        <h3 className="text-sm font-bold mb-2">
                            Friend Requests
                        </h3>
                        {incomingRequests.length > 0 ? (
                            <ul>
                                {incomingRequests.map((request, index) => (
                                    <li
                                        key={index}
                                        className="mb-4 last:mb-0 flex items-start space-x-3"
                                    >
                                        {/* Avatar */}
                                        <Avatar>
                                            {request?.user.profilePictureUrl ? (
                                                <AvatarImage
                                                    src={
                                                        request?.user
                                                            ?.profilePictureUrl
                                                    }
                                                    alt={
                                                        request?.user?.firstName
                                                    }
                                                />
                                            ) : (
                                                <AvatarFallback>
                                                    {
                                                        request?.user
                                                            ?.firstName[0]
                                                    }
                                                </AvatarFallback>
                                            )}
                                        </Avatar>

                                        {/* User Details */}
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold">
                                                {request?.user?.firstName}{" "}
                                                <span className="text-gray-500">
                                                    @{request?.user?.username}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {format(
                                                    new Date(
                                                        request?.createdAt
                                                    ),
                                                    "MMMM d, yyyy"
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Icons */}
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-green-500 hover:bg-green-50"
                                                aria-label="Accept"
                                                onClick={() =>
                                                    handleAcceptFriendRequest(
                                                        request?.user?.id
                                                    )
                                                }
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:bg-red-50"
                                                aria-label="Reject"
                                            >
                                                <XCircle className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No incoming requests.
                            </p>
                        )}
                    </div>

                    {/* Outgoing Friend Requests */}
                    <div>
                        <h3 className="text-sm font-bold mb-2">
                            Sent Requests
                        </h3>
                        {outgoingRequests.length > 0 ? (
                            <ul>
                                {outgoingRequests.map((request, index) => (
                                    <li
                                        key={index}
                                        className="mb-4 last:mb-0 flex items-start space-x-3"
                                    >
                                        {/* Avatar */}
                                        <Avatar>
                                            {request?.friend
                                                .profilePictureUrl ? (
                                                <AvatarImage
                                                    src={
                                                        request?.friend
                                                            ?.profilePictureUrl
                                                    }
                                                    alt={
                                                        request?.friend
                                                            ?.firstName
                                                    }
                                                />
                                            ) : (
                                                <AvatarFallback>
                                                    {
                                                        request?.friend
                                                            ?.firstName[0]
                                                    }
                                                </AvatarFallback>
                                            )}
                                        </Avatar>

                                        {/* User Details */}
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold">
                                                {request?.friend?.firstName}{" "}
                                                <span className="text-gray-500">
                                                    @{request?.friend?.username}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {format(
                                                    new Date(
                                                        request?.createdAt
                                                    ),
                                                    "MMMM d, yyyy"
                                                )}
                                            </div>
                                        </div>

                                        {/* Status */}
                                        <div className="text-sm font-semibold text-blue-500">
                                            Pending
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No outgoing requests.
                            </p>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default FriendRequestPopover;
