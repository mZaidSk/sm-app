import { SetStateAction, Dispatch } from "react";
import ProfileImgButton from "./ProfileImgButton";

interface ProfileImageComponentProps {
    profileImg: string;
    setProfileImg: Dispatch<SetStateAction<string>>;
}

const ProfileImageComponent = ({
    profileImg,
    setProfileImg,
}: ProfileImageComponentProps) => {
    const handleImageSelect = (newImg: SetStateAction<string>) => {
        setProfileImg(newImg);
    };

    return (
        <div className="relative w-28 h-28">
            <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border border-gray-300"
            />
            <div className="absolute bottom-0 right-0">
                <ProfileImgButton onSelect={handleImageSelect} />
            </div>
        </div>
    );
};

export default ProfileImageComponent;
