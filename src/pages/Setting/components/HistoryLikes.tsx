import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";


const likedPosts = [
    { id: 1, title: 'Post 1', content: 'Content of post 1' },
    { id: 2, title: 'Post 2', content: 'Content of post 2' },
    { id: 3, title: 'Post 3', content: 'Content of post 3' },
    
  ];
  
const HistoryLikes = () => {
    return <div className="m-4 p-5">
        <Label className="text-lg mb-3">Likes History</Label>
    {likedPosts.length === 0 ? (
            <p>No liked posts yet.</p>
          ) : (
            likedPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-3 my-2 border-b">
                <div>
                  <h3 className="text-md font-medium">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.content}</p>
                </div>
                <Button variant="outline">View</Button>
              </div>
            ))
          )}
    </div>;
};

export default HistoryLikes;
