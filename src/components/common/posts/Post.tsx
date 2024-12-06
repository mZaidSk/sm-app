import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import PostContent from "./PostContent";

const Post = () => {
    // Data for the post
    const user = {
        name: "FirstName LastName",
        username: "@Username",
        profileImage: "https://github.com/shadcn.png",
        isFollowing: false, 
    };

    const content ="https://github.com/shadcn.png"; 

    const postInteractions = {
        likes: 0,
        loves: 0,
        laughs: 0,
        comments: 0,
    };

    return (
        <Card className="w-full shadow-lg border border-gray-300 bg-white rounded-lg overflow-hidden">
            {/* Card Header */}
            <CardHeader className="p-4 border-b border-gray-200 bg-gray-50">
                <PostHeader
                    name={user.name}
                    username={user.username}
                    profileImage={user.profileImage}
                    isFollowing={user.isFollowing}
                />
            </CardHeader>

            {/* Card Content */}
            <CardContent className="p-4">
                <PostContent content={content} />
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="p-4 border-t border-gray-200 bg-gray-50">
                <PostFooter
                    likes={postInteractions.likes}
                    loves={postInteractions.loves}
                    laughs={postInteractions.laughs}
                    comments={postInteractions.comments}
                />
            </CardFooter>
        </Card>
    );
};

export default Post;
