import Post from "@/components/common/posts/post";
import { getUserFeed } from "@/store/slice/FeedSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const FeedPost = () => {
    const dispatch = useDispatch<AppDispatch>();
    const feedPostSelector = useSelector(
        (state: RootState) => state.feed.feedPost || []
    );

    const fetchFeedPost = () => {
        dispatch(getUserFeed());
    };

    useEffect(() => {
        fetchFeedPost();
    }, []);
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            {feedPostSelector.map((post: any) => {
                return <Post post={post} key={post.id} />;
            })}
        </div>
    );
};
