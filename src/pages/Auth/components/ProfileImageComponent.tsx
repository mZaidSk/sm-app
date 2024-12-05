import { SetStateAction, useState } from "react";
import ProfileImgButton from "./ProfileImgButton";


const ProfileImageComponent = () => {

  const [profileImg, setProfileImg] = useState("profile-img/p1-cat.jpg");

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
}

export default ProfileImageComponent;