import React, { useState } from 'react';
import { ThumbsUp, Heart, Laugh, MessageSquare } from 'lucide-react'; // Example icons from lucide-react
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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


const PostFooter = () => {
  // State to track the button states and counts
  const [likes, setLikes] = useState(0);
  const [loves, setLoves] = useState(0);
  const [laughs, setLaughs] = useState(0);
  const [comments, setComments] = useState(0);

  const [liked, setLiked] = useState(false);
  const [loved, setLoved] = useState(false);
  const [laughed, setLaughed] = useState(false);
  const [commented, setCommented] = useState(false);

  // Toggle like button
  const handleLike = () => {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1)); 
  };

  // Toggle love button
  const handleLove = () => {
    setLoved(!loved);
    setLoves(loves + (loved ? -1 : 1)); 
  };

  // Toggle laugh button
  const handleLaugh = () => {
    setLaughed(!laughed);
    setLaughs(laughs + (laughed ? -1 : 1)); 
  };

  

  return (
    <div className="flex space-x-6 mt-0 mb-2 items-center justify-between w-full ">
      <div className="flex space-x-6 mt-2 items-center">
        {/* Like Button */}
        <button
            className={`flex items-center space-x-2 ${liked ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={handleLike}
        >
            <ThumbsUp size={20}/>
            <span>{likes}</span>
        </button>

        {/* Love Button */}
        <button
            className={`flex items-center space-x-2 ${loved ? 'text-red-500' : 'text-gray-500'}`}
            onClick={handleLove}
        >
            <Heart size={20} />
            <span>{loves}</span>
        </button>

        {/* Laugh Button */}
        <button
            className={`flex items-center space-x-2 ${laughed ? 'text-yellow-500' : 'text-gray-500'}`}
            onClick={handleLaugh}
        >
            <Laugh size={20} />
            <span>{laughs}</span>
        </button>
      </div>
      
      {/* Comment Button */}
      <div className="flex space-x-6 items-center">
      <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"><MessageSquare size={20} /></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
      </div>
    </div>
  );
};

export default PostFooter;
