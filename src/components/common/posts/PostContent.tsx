import React from "react";

interface PostContentProps {
    content: {
        postType: "TEXT" | "IMAGE"; // Define postType as either "TEXT" or "IMAGE"
        content: string; // The content can be a text string
        mediaUrl?: string; // The mediaUrl is optional and present only if the postType is IMAGE
    };
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
    return (
        <div className="border shadow-md">
            {/* Check if the postType is TEXT or IMAGE */}
            {content.postType === "TEXT" ? (
                <p className="text-lg text-gray-700 p-4">{content.content}</p>
            ) : content.postType === "IMAGE" && content.mediaUrl ? (
                <img
                    src={content.mediaUrl}
                    alt="Content"
                    className="w-full h-auto object-cover" // Set fixed height, width, and object-fit
                />
            ) : (
                <p className="text-red-500">Invalid content type</p>
            )}
        </div>
    );
};

export default PostContent;
