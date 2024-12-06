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

// Define the type for a single post
type Post = {
    id: number;
    content: string;
};

const ProfilePosts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    // Function to add a new post
    const handleCreatePost = () => {
        const newPost: Post = {
            id: posts.length + 1,
            content: `This is post #${posts.length + 1}`,
        };
        setPosts([...posts, newPost]);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-4">
            {posts.length === 0 ? (
                <Alert className="flex flex-col justify-center items-center p-8">
                    <AlertTitle>No Posts Yet</AlertTitle>
                    <AlertDescription>
                        You don’t have any posts. Start by creating one below.
                    </AlertDescription>
                    <Button onClick={handleCreatePost} className="mt-2">
                        Create Post
                    </Button>
                </Alert>
            ) : (
                <div className="space-y-4">
                    {/* Posts Container */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto py-10 px-4">
                        {/* Rendering the Posts */}
                        <Post />
                        <Post />
                        <Post />
                        {/* Add more <Post /> components as needed */}
                    </div>

                    {/* Button */}
                    <div className="flex justify-center">
                        <Button
                            onClick={handleCreatePost}
                            className="py-3 text-white rounded-md"
                        >
                            Add Post
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePosts;
