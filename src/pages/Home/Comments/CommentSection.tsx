import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getCommentByPostId, createComment } from "@/store/slice/CommentSlice";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { MessageCirclePlusIcon, MessageSquare } from "lucide-react";
import CommentItem from "./CommentItem";

interface NewCommentProps {
    postId: string;
}

const CommentSection: React.FC<NewCommentProps> = ({ postId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const comments = useSelector((state: RootState) => state.comment.comments);
    const [newComment, setNewComment] = useState("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    console.log(comments);

    const fetchComments = () => {
        dispatch(getCommentByPostId(postId));
    };

    const handlePostComment = async () => {
        if (newComment.trim()) {
            const payload = {
                postId,
                content: newComment,
            };
            await dispatch(createComment(payload));
            fetchComments(); // Refresh comments to show the new one
            setNewComment(""); // Clear the input field
        }
    };

    const handleSheetOpenChange = (open: boolean) => {
        setIsSheetOpen(open);
        if (open) {
            fetchComments(); // Fetch comments only when the sheet is opened
        }
    };

    return (
        <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <MessageSquare size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col h-[100vh] w-100">
                <SheetHeader className="justify-center">
                    <SheetTitle>Comments</SheetTitle>
                </SheetHeader>

                {/* Comments Section */}
                <div className="flex-1 overflow-y-auto space-y-2 w-full">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-4">
                            No comments available. Be the first to comment!
                        </p>
                    )}
                </div>

                {/* Input and Button */}
                <div className="mt-4 flex items-center space-x-4 pt-4 border-t bg-white">
                    <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-grow border border-gray-300 rounded-md resize-none"
                        rows={2}
                    />
                    <Button
                        onClick={handlePostComment}
                        className="bg-zinc-800 text-white p-2 rounded-md"
                    >
                        <MessageCirclePlusIcon size={30} />
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CommentSection;
