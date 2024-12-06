import React, { useState } from "react";
import { ThumbsUp, Heart, Laugh, MessageSquare } from "lucide-react"; // Example icons from lucide-react
import CommentSection from "@/pages/Home/Comments/CommentSection";

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
            <CommentSection username={"lathika09"} profileImage={"https://example.com/profile-img/p1-cat.jpg"}/>
        </div>
    );
};

export default PostFooter;
