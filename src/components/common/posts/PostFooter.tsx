import React, { useState, useEffect } from "react";
import { ThumbsUp, Heart, Laugh } from "lucide-react";
import CommentSection from "@/pages/Home/Comments/CommentSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
    createPostReaction,
    removePostReaction,
} from "@/store/slice/PostSlice";

// Interface for the PostFooter component props
interface PostFooterProps {
    id: string; // Post ID
    initialReactions: { reaction: "LIKE" | "LOVE" | "LAUGH"; userId: string }[]; // Initial reactions data
}

const PostFooter: React.FC<PostFooterProps> = ({ id, initialReactions }) => {
    const authUser = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const [reactions, setReactions] = useState(initialReactions);
    const [userReaction, setUserReaction] = useState<
        "LIKE" | "LOVE" | "LAUGH" | null
    >(null);

    // Calculate reaction counts dynamically
    const likeCount = reactions.filter((r) => r.reaction === "LIKE").length;
    const loveCount = reactions.filter((r) => r.reaction === "LOVE").length;
    const laughCount = reactions.filter((r) => r.reaction === "LAUGH").length;

    // Update the user reaction when the component mounts or when reactions change
    useEffect(() => {
        const currentUserReaction =
            reactions.find((r) => r.userId === authUser.id)?.reaction || null;
        setUserReaction(currentUserReaction);
    }, [reactions, authUser.id]);

    // Handle reaction change
    const handleReaction = (reaction: "LIKE" | "LOVE" | "LAUGH") => {
        if (userReaction === reaction) {
            // If user clicks the same reaction again, remove it
            dispatch(removePostReaction(id));
            setReactions(
                reactions.filter(
                    (r) => r.userId !== authUser.id || r.reaction !== reaction
                )
            );
            setUserReaction(null);
        } else {
            // If user clicks a different reaction, remove the old reaction first
            if (userReaction) {
                dispatch(removePostReaction(id));
                setReactions(
                    reactions.filter(
                        (r) =>
                            r.userId !== authUser.id ||
                            r.reaction !== userReaction
                    )
                );
            }
            // Add the new reaction
            dispatch(createPostReaction({ postId: id, reaction }));
            setReactions([
                ...reactions.filter((r) => r.userId !== authUser.id), // Remove old reaction
                { reaction, userId: authUser.id }, // Add new reaction
            ]);
            setUserReaction(reaction);
        }
    };

    return (
        <div className="flex space-x-6 mt-0 mb-2 items-center justify-between w-full">
            <div className="flex space-x-6 mt-2 items-center">
                <button
                    className={`flex items-center space-x-2 ${userReaction === "LIKE" ? "text-blue-500" : "text-gray-500"}`}
                    onClick={() => handleReaction("LIKE")}
                >
                    <ThumbsUp size={20} />
                    <span>{likeCount}</span>
                </button>

                <button
                    className={`flex items-center space-x-2 ${userReaction === "LOVE" ? "text-red-500" : "text-gray-500"}`}
                    onClick={() => handleReaction("LOVE")}
                >
                    <Heart size={20} />
                    <span>{loveCount}</span>
                </button>

                <button
                    className={`flex items-center space-x-2 ${userReaction === "LAUGH" ? "text-yellow-500" : "text-gray-500"}`}
                    onClick={() => handleReaction("LAUGH")}
                >
                    <Laugh size={20} />
                    <span>{laughCount}</span>
                </button>
            </div>

            {/* Comment Section */}
            <CommentSection postId={id} />
        </div>
    );
};

export default PostFooter;
