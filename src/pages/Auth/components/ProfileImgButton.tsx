
import { ImageUp } from 'lucide-react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"


  
interface ProfileImgButtonProps {
    onSelect: (imgLink: string) => void;
  }
  
const profileImgDemo = [
    { alt: "img 1 cat img", link: "/profile-img/p1-cat.jpg" },
    
    { alt: "img 1 cat img", link: "/profile-img/p1-cat.jpg" },
    { alt: "img 1 cat img", link: "/profile-img/p2.jpg" },
    { alt: "img 1 cat img", link: "/profile-img/p1-cat.jpg" },
    { alt: "img 1 cat img", link: "/profile-img/p1-cat.jpg" },
    { alt: "img 1 cat img", link: "/profile-img/p2.jpg" },
    { alt: "img 2 cat img", link: "/profile-img/p2-cat.jpg" },
    { alt: "img 3 cat img", link: "/profile-img/p3-cat.jpg" },
    { alt: "img 4 cat img", link: "/profile-img/p4-cat.jpg" },
  ];
  
  const ProfileImgButton: React.FC<ProfileImgButtonProps> = ({ onSelect }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                    <ImageUp />
                </button>
            </PopoverTrigger>
            <PopoverContent
                className="w-80 h-60 overflow-y-auto p-2 bg-white border border-gray-300 rounded shadow-lg"
            >
                <div className="grid grid-cols-2 gap-2">
                    {profileImgDemo.map((img, index) => (
                        <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => onSelect(img.link)}
                        >
                            <img
                                // src="/profile-img/p1-cat.jpg"
                                src={img.link}
                                alt={img.alt}
                                className="w-full h-auto"
                            />
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};


export default ProfileImgButton;