import AvatarContainer from '@/components/common/AvatarConatiner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { MessageCirclePlusIcon, MessageSquare } from 'lucide-react';
import React, { useState } from 'react';
import CommentItem from './CommentItem';


interface NewCommentProps {
  username: string;
  profileImage:string;
}

const CommentSection : React.FC<NewCommentProps> = ({
  username,
  profileImage,
}) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'lathika',
      content: 'This is a comment1',
      datePosted: '6/12/2024, 10:30:00 am',
      profileImage: "/profile-img/p1-cat.jpg",
    },
    {
      id: 2,
      user: 'rsr',
      content: 'This is comment3',
      datePosted: '6/12/2024, 10:30:09 am',
      profileImage: "/profile-img/p1-cat.jpg",
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handlePostComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: comments.length + 1,
        user: username,
        content: newComment,
        datePosted: new Date().toLocaleString(),
        profileImage: profileImage,
      };
      setComments([...comments, newCommentData]);
      setNewComment(''); 
    }
  };

  return (
    <div className="flex space-x-6 items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <MessageSquare size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col h-[100vh] ">
          <SheetHeader className="justify-center">
            <SheetTitle>Comments</SheetTitle>
          </SheetHeader>

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {comments.map((comment) => (
              <CommentItem id={comment.id} user={comment.user} content={comment.content} datePosted={comment.datePosted} profileImage={comment.profileImage}/>
            ))}
          </div>


            {/* input and button  */}
          <div className="mt-4 flex items-center space-x-4 pt-4 border-t bg-white">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow border border-gray-300 rounded-md resize-none"
              rows={2}
            />
            <Button onClick={handlePostComment} className="bg-zinc-800 text-white p-2 rounded-md">
              <MessageCirclePlusIcon size={30} />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CommentSection;
