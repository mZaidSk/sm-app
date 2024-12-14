import { Settings, UserRound } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getUser, getUserById } from "@/store/slice/UserSlice";
import ProfilePosts from "./ProfilePosts";
import FriendsSheet from "./FriendSheet";
import Loader from "@/components/common/Loader";
import {
    acceptFriendRequest,
    getFriendList,
    getPendingRequests,
    removeFriend,
    sendFriendRequest,
} from "@/store/slice/FriendSlice";
import { transformFriendListData } from "@/lib/utils";

const Profile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    // Selectors
    const authUser = useSelector((state: RootState) => state.auth.user || {});
    const user = useSelector((state: RootState) => state.user.user || {});
    const isLoading = useSelector((state: RootState) => state.user.loading);

    // Fetch user and friend data
    useEffect(() => {
        if (id) {
            dispatch(getUserById({ id }));
        } else {
            dispatch(getUser());
        }
    }, [id, dispatch]);

    const handleFriendAction = async (action: string, requestId?: string) => {
        try {
            switch (action) {
                case "UNFRIEND":
                case "CANCEL_REQUEST":
                    if (requestId) {
                        await dispatch(removeFriend({ requestId }));
                    }
                    break;
                case "ACCEPT_REQUEST":
                    if (id) {
                        await dispatch(acceptFriendRequest({ friendId: id }));
                    }
                    break;
                case "ADD_FRIEND":
                    if (id) {
                        await dispatch(sendFriendRequest({ friendId: id }));
                    }
                    break;
                default:
                    return; // Exit if the action is not recognized
            }

            // Common actions after friend-related updates
            if (id) {
                await dispatch(getUserById({ id }));
            } else {
                await dispatch(getUser());
            }
            await dispatch(getPendingRequests());
        } catch (error) {
            console.error("Error handling friend action:", error);
        }
    };

    const renderFriendButton = () => {
        const {
            friend_status: status,
            friend_id,
            friend_initiatedBy,
        } = user.friend || {};

        switch (status) {
            case "ACCEPTED":
                return (
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-gray-300 hover:border-gray-400 shadow-sm"
                        onClick={() =>
                            handleFriendAction("UNFRIEND", friend_id)
                        }
                    >
                        Unfriend
                    </Button>
                );
            case "PENDING":
                return (
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-gray-300 hover:border-gray-400 shadow-sm"
                        onClick={() =>
                            handleFriendAction(
                                authUser.id === friend_initiatedBy
                                    ? "CANCEL_REQUEST"
                                    : "ACCEPT_REQUEST",
                                friend_id
                            )
                        }
                    >
                        {authUser.id === friend_initiatedBy
                            ? "Cancel Request"
                            : "Accept Request"}
                    </Button>
                );
            default:
                return (
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-gray-300 hover:border-gray-400 shadow-sm"
                        onClick={() => handleFriendAction("ADD_FRIEND")}
                    >
                        Add Friend
                    </Button>
                );
        }
    };

    const renderTabsContent = (key: string, filterType: string) => {
        const filteredPosts = user.posts?.filter(
            (post: any) => post.postType === filterType
        );
        return filteredPosts?.length ? (
            <ProfilePosts posts={filteredPosts} postType={filterType} />
        ) : (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No {key} available.</p>
            </div>
        );
    };

    return (
        <Card className="max-w-5xl mx-auto p-6 bg-gradient-to-tr from-gray-50 via-white to-gray-100 shadow-xl rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <CardHeader className="flex flex-col md:flex-row items-center gap-8">
                        <Avatar className="w-40 h-40 ring-2 ring-primary shadow-md">
                            <AvatarImage
                                src={user.profilePictureUrl}
                                alt="Profile Picture"
                                className="object-cover rounded-full"
                            />
                            <AvatarFallback>
                                <UserRound className="w-14 h-14 text-gray-500" />
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col w-full gap-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-wide">
                                        {user.firstName || "John"}{" "}
                                        {user.lastName || "Doe"}
                                    </h2>
                                    <h4 className="text-lg font-medium text-gray-500">
                                        @{user.username || "username"}
                                    </h4>
                                </div>

                                <div className="flex gap-3">
                                    {!id ? (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="rounded-full border-gray-300 hover:border-gray-400 shadow-sm"
                                            >
                                                Edit Profile
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-full hover:bg-gray-100"
                                            >
                                                <Settings className="w-6 h-6 text-gray-600" />
                                            </Button>
                                        </>
                                    ) : (
                                        renderFriendButton()
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-8 text-gray-600 text-sm">
                                {["Posts", "Friends"].map((label, index) => (
                                    <div
                                        key={label}
                                        className="hover:text-gray-900 cursor-pointer transition-all duration-300"
                                    >
                                        <strong className="block text-xl font-semibold">
                                            {label === "Posts"
                                                ? user.posts?.length || 0
                                                : user.friends?.length || 0}
                                        </strong>
                                        {label === "Friends" ? (
                                            <FriendsSheet id={user.id} />
                                        ) : (
                                            label
                                        )}
                                    </div>
                                ))}
                            </div>

                            <p className="text-gray-700 text-base">
                                {user.bio || "No bio available"}
                            </p>
                        </div>
                    </CardHeader>

                    <Separator className="my-4" />

                    <Tabs defaultValue="posts" className="w-full">
                        <div className="flex justify-end">
                            <TabsList className="border-b border-gray-200">
                                {[
                                    { label: "Posts", key: "posts" },
                                    { label: "Text Posts", key: "text-posts" },
                                ].map((tab) => (
                                    <TabsTrigger
                                        key={tab.key}
                                        value={tab.key}
                                        className="text-gray-700 hover:text-primary font-medium px-6 py-2 border-b-2 transition-all duration-300 hover:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    >
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <TabsContent value="posts">
                            {renderTabsContent("posts", "IMAGE")}
                        </TabsContent>

                        <TabsContent value="text-posts">
                            {renderTabsContent("text-posts", "TEXT")}
                        </TabsContent>
                    </Tabs>
                </>
            )}
        </Card>
    );
};

export default Profile;
