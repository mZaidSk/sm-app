import AvatarContainer from "@/components/common/AvatarConatiner";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface CommentItemProps {
    comment: {
        id: string;
        user: {
            id: string;
            firstName: string;
            username: string;
            profilePictureUrl: string;
        };
        createdAt: string;
        content: string;
    };
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    return (
        <div className="comment-item p-3 flex gap-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300 border border-gray-200">
            {/* User Profile */}
            <AvatarContainer
                username={comment.user.username}
                profileImage={comment.user.profilePictureUrl}
            />

            {/* Comment Details */}
            <div className="flex-1 w-96">
                {/* Header: User Info and Date */}
                <div className="flex justify-between items-start gap-2">
                    <Link to={`profile/${comment.user.id}`}>
                        <div>
                            <p className="font-semibold text-gray-900 text-base leading-tight">
                                {comment.user.firstName}
                            </p>
                            <p className="text-xs text-gray-500 -mt-1">
                                @{comment.user.username}
                            </p>
                        </div>
                    </Link>
                    <p className="text-xs text-gray-400">
                        {format(new Date(comment.createdAt), "MMMM d, yyyy")}
                    </p>
                </div>

                {/* Comment Content */}
                <div className="mt-2">
                    <p className="text-sm text-gray-800 leading-6 break-words">
                        {comment.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
