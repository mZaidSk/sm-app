import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Post from "@/components/common/posts/Post";
import { Link } from "react-router-dom";

interface ProfilePostsProps {
    posts: any[];
    postType: string;
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({
    posts,
    postType,
}: any) => {
    return (
        <div className="max-w-5xl mx-auto p-4 space-y-4">
            {posts?.length === 0 ? (
                <Alert className="flex flex-col justify-center items-center p-8">
                    <AlertTitle>No Posts Yet</AlertTitle>
                    <AlertDescription>
                        You don’t have any posts. Start by creating one below.
                    </AlertDescription>
                    <Link to="/post" className="mt-2">
                        <Button>Create Post</Button>
                    </Link>
                </Alert>
            ) : (
                <div className="space-y-4">
                    {/* Posts Container */}
                    {postType == "IMAGE" ? (
                        <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto py-10 px-4">
                            {/* Rendering the Posts */}
                            {posts
                                ?.filter(
                                    (post: any) => post.postType === postType
                                )
                                .map((post: any, index: any) => {
                                    return <Post key={index} post={post} />;
                                })}
                            {/* Add more <Post /> components as needed */}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 ">
                            {/* Rendering the Posts */}
                            {posts
                                ?.filter(
                                    (post: any) => post.postType === postType
                                )
                                .map((post: any, index: any) => {
                                    return <Post key={index} post={post} />;
                                })}
                            {/* Add more <Post /> components as needed */}
                        </div>
                    )}

                    {/* Button */}
                    {/* <div className="flex justify-center">
                        <Button
                            onClick={handleCreatePost}
                            className="py-3 text-white rounded-md"
                        >
                            Add Post
                        </Button>
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default ProfilePosts;
