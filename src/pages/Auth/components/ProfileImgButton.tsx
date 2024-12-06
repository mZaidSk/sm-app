import { ImageUp } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface ProfileImgButtonProps {
    onSelect: (imgLink: string) => void;
}

const profileImgDemo = [
    { alt: "img 1", link: "/profile-img/p1-cat.jpg" },
    { alt: "img 2", link: "/profile-img/p2.jpg" },
    { alt: "img 3", link: "/profile-img/p3.jpg" },
    { alt: "img 4", link: "/profile-img/p4.jpg" },
    { alt: "img 5", link: "/profile-img/p5.jpg" },
    { alt: "img 6", link: "/profile-img/p6.jpg" },
];

const ProfileImgButton: React.FC<ProfileImgButtonProps> = ({ onSelect }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-300 shadow-md transition-all focus:ring-2 focus:ring-blue-500"
                >
                    <ImageUp className="text-gray-600" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-72 overflow-y-auto p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="grid grid-cols-3 gap-4">
                    {profileImgDemo.map((img, index) => (
                        <div
                            key={index}
                            className="cursor-pointer hover:scale-105 transition-transform duration-200"
                            onClick={() => onSelect(img.link)}
                        >
                            <img
                                src={img.link}
                                alt={img.alt}
                                className="w-24 h-24 object-cover rounded-md border border-gray-200 hover:border-blue-400"
                            />
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ProfileImgButton;
