import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
interface UserAvatarProps {
    size: number; 
    profileImage: string;
    username: string; 
    firstName: string; 
    lastName: string; 
  }
  
  const UserAvatar: React.FC<UserAvatarProps> = ({ 
  size, 
  profileImage, 
  username, 
  firstName, 
  lastName 
}) => {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className={`w-[${size}%] h-[${size}%]`}>
        <AvatarImage src={profileImage} alt="Profile Picture" />
        <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <Label className="text-lg font-semibold">
          {firstName} {lastName}
        </Label>
        <p className="text-sm text-gray-600">{username}</p>
      </div>
    </div>
  );
};

export default UserAvatar;
