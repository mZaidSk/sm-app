import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const likedPosts = [
  { id: 1, title: 'Post 1', content: 'Content of post 1' },
  { id: 2, title: 'Post 2', content: 'Content of post 2' },
  { id: 3, title: 'Post 3', content: 'Content of post 3' },
  { id: 1, title: 'Post 1', content: 'Content of post 1' },
  { id: 2, title: 'Post 2', content: 'Content of post 2' },
  { id: 3, title: 'Post 3', content: 'Content of post 3' },
  { id: 1, title: 'Post 1', content: 'Content of post 1' },
  { id: 2, title: 'Post 2', content: 'Content of post 2' },
  { id: 3, title: 'Post 3', content: 'Content of post 3' },
];

const commentedPosts = [
  { id: 1, title: 'Post A', comment: 'Comment on Post A' },
  { id: 2, title: 'Post B', comment: 'Comment on Post B' },
  { id: 3, title: 'Post C', comment: 'Comment on Post C' },
];
type HistoryPageProps = {
    activeSection: "Like" | "Comments"; 
    setHistorySection: React.Dispatch<React.SetStateAction<"Like" | "Comments">>;
  };
  
  const HistoryPage: React.FC<HistoryPageProps> = ({ activeSection, setHistorySection }) => {
  const renderHistoryContent = () => {
    if (activeSection === "Like") {
      return (
        <div>
          {likedPosts.length === 0 ? (
            <p>No liked posts yet.</p>
          ) : (
            likedPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 mb-4 border-b">
                <div>
                  <h3 className="text-lg font-medium">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.content}</p>
                </div>
                <Button variant="outline">View</Button>
              </div>
            ))
          )}
        </div>
      );
    } else if (activeSection === "Comments") {
      return (
        <div>
          {commentedPosts.length === 0 ? (
            <p>No commented posts yet.</p>
          ) : (
            commentedPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 mb-4 border-b">
                <div>
                  <h3 className="text-lg font-medium">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.comment}</p>
                </div>
                <Button variant="outline">View Comment</Button>
              </div>
            ))
          )}
        </div>
      );
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">History</CardTitle>
          <CardDescription>Select a section to view your history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button
              variant={activeSection === "Like" ? "outline" : "default"}
              onClick={() => setHistorySection("Like")}
              
            >
              Liked Posts
            </Button>
            <Button
              variant={activeSection === "Comments" ? "outline" : "default"}
              onClick={() => setHistorySection("Comments")}
            >
              Commented Posts
            </Button>
          </div>
          {renderHistoryContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;
