import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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
                    {posts.map((post) => (
                        <Card key={post.id}>
                            <CardHeader>
                                <h3 className="text-lg font-medium">
                                    Post #{post.id}
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p>{post.content}</p>
                            </CardContent>
                        </Card>
                    ))}
                    <Button onClick={handleCreatePost} className="w-full">
                        Add Another Post
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProfilePosts;
