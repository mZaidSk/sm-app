import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CommentItem from "@/pages/Home/Comments/CommentItem";
import { getCommentByPostId } from "@/store/slice/CommentSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const commentedPosts = [
    
  {
    id: "post1",
    user: {
      id: "user1",
      firstName: "Lathika",
      username: "lathika09",
      profilePictureUrl: "/profile-img/p1-cat.jpg",
    },
    createdAt: "2024-12-07T08:34:14.115Z",
    content: "Having fun!",
  },
  {
    id: "post1",
    user: {
      id: "user1",
      firstName: "Lathika",
      username: "lathika09",
      profilePictureUrl: "/profile-img/p1-cat.jpg",
    },
    createdAt: "2024-12-07T08:34:14.115Z",
    content: "Commented a post",
  },

    
  ];

const HistoryComments = () => {
    
    return <div className="m-4  p-5">
        <Label className="text-lg mb-3">Comments History</Label>
        {commentedPosts.length === 0 ? (
            <p>No liked posts yet.</p>
          ) : (
            commentedPosts.map((comment) => (
              <div key={comment.id} className="flex items-center justify-between p-3 ">
                <CommentItem key={comment.id} comment={comment} />
              </div>
            ))
          )}
        </div>;
};

export default HistoryComments;
