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
import { getFriendList } from "@/store/slice/FriendSlice";
import { transformFriendListData } from "@/lib/utils";

const friendsList = [
    {
        username: "lathika09",
        name: "Lathika",
        profileImage: "/profile-img/p1-cat.jpg",
        isFollowing: true,
    },
    {
        username: "zaid08",
        name: "Zaid",
        profileImage: "https://github.com/shadcn.png",
        isFollowing: false,
    },
];

const Profile: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Retrieve the id from the route
    const dispatch = useDispatch<AppDispatch>();
    const userSelector = useSelector(
        (state: RootState) => state.user.user || {}
    );
    const userFriendSelector = useSelector(
        (state: RootState) => state.friend.friendList
    );
    const isLoading = useSelector((state: RootState) => state.user.loading);

    useEffect(() => {
        if (id) {
            fetchUserInfoById(id);
        } else {
            fetchUserInfo();
        }
        fetchUserFriends();
    }, [id]);

    const fetchUserInfo = () => {
        dispatch(getUser());
    };

    const fetchUserInfoById = (id: string) => {
        // Dispatch action for fetching user info based on id
        dispatch(getUserById({ id }));
    };

    const fetchUserFriends = () => {
        if (id) dispatch(getFriendList({ userId: id }));
        else dispatch(getFriendList({}));
    };

    const tabsData = [
        {
            label: "Posts",
            key: "posts",
        },
        {
            label: "Text Posts",
            key: "text-posts",
        },
    ];

    const renderEmptyState = (message: string) => (
        <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{message}</p>
        </div>
    );

    const handleFollow = (username: any) => {
        // setFriends((prev) =>
        //     prev.map((friend) =>
        //         friend.username === username
        //             ? { ...friend, isFollowing: true }
        //             : friend
        //     )
        // );
    };

    const handleUnfollow = (username: any) => {
        // setFriends((prev) =>
        //     prev.map((friend) =>
        //         friend.username === username
        //             ? { ...friend, isFollowing: false }
        //             : friend
        //     )
        // );
    };

    const friendsIds = new Set([id]);
    const transformedFriendsList = transformFriendListData(
        userFriendSelector,
        userSelector?.id,
        friendsIds
    );

    return (
        <Card className="max-w-5xl mx-auto p-6 bg-gradient-to-tr from-gray-50 via-white to-gray-100 shadow-xl rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <CardHeader className="flex flex-col md:flex-row items-center gap-8">
                        {/* Profile Picture */}
                        <Avatar className="w-40 h-40 ring-2 ring-primary shadow-md">
                            <AvatarImage
                                src={userSelector.profilePictureUrl}
                                alt="Profile Picture"
                                className="object-cover rounded-full"
                            />
                            <AvatarFallback>
                                <UserRound className="w-14 h-14 text-gray-500" />
                            </AvatarFallback>
                        </Avatar>

                        {/* User Info */}
                        <div className="flex flex-col w-full gap-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-wide">
                                        {userSelector.firstName || "John"}{" "}
                                        {userSelector.lastName || "Doe"}
                                    </h2>
                                    <h4 className="text-lg font-medium text-gray-500">
                                        @{userSelector.username || "username"}
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
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full border-gray-300 hover:border-gray-400 shadow-sm"
                                        >
                                            {userSelector.isFriend
                                                ? "Unfriend"
                                                : "Friend"}
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-8 text-gray-600 text-sm">
                                {["Posts", "Friends"].map((label, index) => (
                                    <div
                                        key={label}
                                        className="hover:text-gray-900 cursor-pointer transition-all duration-300"
                                    >
                                        <strong className="block text-xl font-semibold">
                                            {
                                                [
                                                    userSelector?.posts
                                                        ?.length || 0,
                                                    userSelector?.friends
                                                        ?.length || 0,
                                                ][index]
                                            }
                                        </strong>

                                        {label === "Friends" ? (
                                            <FriendsSheet
                                                friendsList={
                                                    transformedFriendsList
                                                }
                                                onFollow={handleFollow}
                                                onUnfollow={handleUnfollow}
                                            />
                                        ) : (
                                            label
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Bio */}
                            <p className="text-gray-700 text-base">
                                {userSelector?.bio || "No bio available"}
                            </p>
                        </div>
                    </CardHeader>

                    <Separator className="my-4" />

                    {/* Tabs Section */}
                    <Tabs defaultValue="posts" className="w-full">
                        <div className="flex justify-end">
                            <TabsList className="border-b border-gray-200">
                                {tabsData.map((tab) => (
                                    <TabsTrigger
                                        key={tab.key}
                                        value={tab.key}
                                        aria-label={`View ${tab.label}`}
                                        className="text-gray-700 hover:text-primary font-medium px-6 py-2 border-b-2 transition-all duration-300 hover:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    >
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <TabsContent value="posts">
                            {userSelector?.posts?.filter(
                                (post: any) => post.postType === "IMAGE"
                            ).length ? (
                                <ProfilePosts
                                    posts={userSelector.posts}
                                    postType="IMAGE"
                                />
                            ) : (
                                renderEmptyState("No posts available.")
                            )}
                        </TabsContent>

                        <TabsContent value="text-posts">
                            {userSelector?.posts?.filter(
                                (post: any) => post.postType === "TEXT"
                            ).length ? (
                                <ProfilePosts
                                    posts={userSelector.posts}
                                    postType="TEXT"
                                />
                            ) : (
                                renderEmptyState("No text posts available.")
                            )}
                        </TabsContent>
                    </Tabs>
                </>
            )}
        </Card>
    );
};

export default Profile;
