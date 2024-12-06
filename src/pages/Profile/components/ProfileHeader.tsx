import { Settings, UserRound } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Outlet } from "react-router-dom";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import AvatarContainer from "@/components/common/AvatarConatiner";
import { useState } from "react";
import FollowButton from "@/pages/Home/components/FollowButton";
import FriendsSheet from "./FriendSheet";

const ProfileHeader = () => {
    const data = {
        userName: "lathikakotian03",
        noOfPost: 0,
        noOfFriends: 12,
        bio: "I want to be a ....",
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

    const [friends, setFriends] = useState(friendsList);

    const handleFollow = (username: any) => {
        setFriends((prev) =>
            prev.map((friend) =>
                friend.username === username
                    ? { ...friend, isFollowing: true }
                    : friend
            )
        );
    };

    const handleUnfollow = (username: any) => {
        setFriends((prev) =>
            prev.map((friend) =>
                friend.username === username
                    ? { ...friend, isFollowing: false }
                    : friend
            )
        );
    };

    return (
        <Card className="max-w-5xl mx-auto p-6 bg-gradient-to-tr from-gray-50 via-white to-gray-100 shadow-xl rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl">
            <CardHeader className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile Picture */}
                <Avatar className="w-40 h-40 ring-2 ring-primary shadow-md">
                    <AvatarImage
                        src="https://images.pexels.com/photos/27806044/pexels-photo-27806044/free-photo-of-black-and-white-cat-portrait.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Profile Picture"
                        className="object-cover rounded-full"
                    />
                    <AvatarFallback>
                        <UserRound className="w-14 h-14 text-gray-500" />
                    </AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex flex-col w-full gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-900">
                            {data.userName}
                        </h2>
                        <div className="flex gap-3">
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
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 text-gray-600 text-sm">
                        <div className="hover:text-gray-900 cursor-pointer transition-all duration-300">
                            <strong className="block text-xl font-semibold">
                                {data.noOfPost}
                            </strong>
                            <Label>Posts</Label>
                        </div>
                        <div className="hover:text-gray-900 cursor-pointer transition-all duration-300">
                            <strong className="block text-xl font-semibold">
                                {data.noOfFriends}
                            </strong>
                            <FriendsSheet
                                friendsList={friends}
                                onFollow={handleFollow}
                                onUnfollow={handleUnfollow}
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-700 text-base">{data.bio}</p>
                </div>
            </CardHeader>

            <Separator className="my-4" />

            {/* Tabs Section */}
            <Tabs defaultValue="posts" className="w-full">
                <div className="flex justify-end">
                    <TabsList className="border-b border-gray-200">
                        {tabsData.map((tab) => (
                            <Link to={tab.key} key={tab.key}>
                                <TabsTrigger
                                    value={tab.key}
                                    className="text-gray-700 hover:text-primary font-medium px-6 py-2 border-b-2 transition-all duration-300 hover:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            </Link>
                        ))}
                    </TabsList>
                </div>

                <TabsContent value="posts">
                    {/* <div className="text-center text-gray-600 mt-6">
                        <h3 className="text-lg font-semibold">
                            Share Your Photos
                        </h3>
                        <p className="mt-2 text-sm">
                            When you share photos, they will appear on your
                            profile.
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-4 rounded-full"
                        >
                            Share Now
                        </Button>
                    </div> */}

                    <Outlet />
                </TabsContent>

                <TabsContent value="text-posts">
                    <div className="text-center text-gray-600 mt-6">
                        <h3 className="text-lg font-semibold">Saved Items</h3>
                        <p className="mt-2 text-sm">
                            Your saved posts will appear here.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        </Card>
    );
};

export default ProfileHeader;
