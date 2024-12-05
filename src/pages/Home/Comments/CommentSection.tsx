import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { MessageSquare } from 'lucide-react';
import React,{ useState } from 'react';


const CommentSection=()=>{
    const [comments, setComments] = useState([
        { id: 1, author: 'Alice', content: 'This is a great post!' },
        { id: 2, author: 'Bob', content: 'Thanks for sharing!' },
      ]);
    
      // State to handle the new comment input
      const [newComment, setNewComment] = useState('');
    
      // Function to handle posting a new comment
      const handlePostComment = () => {
        if (newComment.trim()) {
          const newCommentData = {
            id: comments.length + 1,
            author: 'User', // You can dynamically fetch the user name
            content: newComment,
          };
          setComments([...comments, newCommentData]);
          setNewComment(''); // Clear the input field after posting
        }
      };
      
    return (
        <div className="flex space-x-6 items-center">
      <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"><MessageSquare size={20} /></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
          </SheetHeader>
        
          <div className="mt-4 space-y-4">
            {/* Display list of comments */}
            {comments.map((comment) => (
              <div key={comment.id} className="border-b pb-2">
                <p className="font-semibold">{comment.author}</p>
                {/* <p >{comment.content}</p> */}
                <Textarea value={comment.content} disabled />
              </div>
            ))}
          </div>

        {/* <SheetFooter>
          <SheetClose asChild>
            <div >
            <Input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <Button onClick={handlePostComment} className="mt-2 w-full">
              Post Comment
            </Button>
          </div>
          </SheetClose>
        </SheetFooter> 
         */}
       <div className="mt-4 flex items-center">
  {/* Input field */}
  {/* <Input
    type="text"
    placeholder="Add a comment..."
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    className="flex-grow p-2 border border-gray-300 rounded-md"
  /> */}
  <Textarea
    placeholder="Add a comment..."
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    className="flex-grow p-2 border border-gray-300 rounded-md resize-none"
    rows={3}  // Adjust rows to control height
  />
  {/* Button */}
  <Button
    onClick={handlePostComment}
    className="ml-2 p-2 text-sm w-auto"
  >
    Post Comment
  </Button>
</div>

        
        
      </SheetContent>
    </Sheet>
      </div>
    
        
    );
}

export default CommentSection;


{/* <div className="p-4">
          <h2 className="text-xl font-bold">Comments</h2>
          <div className="mt-4 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b pb-2">
                <p className="font-semibold">{comment.author}</p>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>

          
          
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <Button onClick={handlePostComment} className="mt-2 w-full">
              Post Comment
            </Button>
          </div>
        </div> */}