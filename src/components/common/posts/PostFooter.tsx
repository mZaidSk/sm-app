import React, { useState } from "react";
import { ThumbsUp, Heart, Laugh, MessageSquare } from "lucide-react"; // Example icons from lucide-react
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface PostFooterProps {
    likes: number;
    loves: number;
    laughs: number;
    comments: number;
}

const PostFooter: React.FC<PostFooterProps> = ({
    likes,
    loves,
    laughs,
    comments,
}) => {
    return (
        <div className="flex space-x-6 mt-0 mb-2 items-center justify-between w-full ">
            <div className="flex space-x-6 mt-2 items-center">
                <button
                    className={`flex items-center space-x-2 ${likes > 0 ? "text-blue-500" : "text-gray-500"}`}
                >
                    <ThumbsUp size={20} />
                    <span>{likes}</span>
                </button>

                <button
                    className={`flex items-center space-x-2 ${loves > 0 ? "text-red-500" : "text-gray-500"}`}
                >
                    <Heart size={20} />
                    <span>{loves}</span>
                </button>

                <button
                    className={`flex items-center space-x-2 ${laughs > 0 ? "text-yellow-500" : "text-gray-500"}`}
                >
                    <Laugh size={20} />
                    <span>{laughs}</span>
                </button>
            </div>

            {/* Comment Button */}
            <div className="flex space-x-6 items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <MessageSquare size={20} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save
                                when you're done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value="Pedro Duarte"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="username"
                                    className="text-right"
                                >
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    value="@peduarte"
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default PostFooter;
