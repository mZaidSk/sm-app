import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import PostContent from "./PostContent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Post = ({ post }: any) => {
    const userSelector = useSelector(
        (state: RootState) => state.user.user || {}
    );

    const userData = post?.user ? post.user : userSelector;

    return (
        <Card className="w-full shadow-lg border border-gray-300 bg-white rounded-lg overflow-hidden mb-10">
            {/* Card Header */}
            <CardHeader className="p-4 border-b border-gray-200 bg-gray-50">
                <PostHeader
                    name={userData.firstName}
                    username={userData.username}
                    profileImage={userData.profilePictureUrl}
                    isFollowing={false}
                />
            </CardHeader>

            {/* Card Content */}
            <CardContent className="p-0">
                <PostContent content={post} />
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="p-4 border-t border-gray-200 bg-gray-50">
                <PostFooter id={post.id} initialReactions={post.reactions} />
            </CardFooter>
        </Card>
    );
};

export default Post;
