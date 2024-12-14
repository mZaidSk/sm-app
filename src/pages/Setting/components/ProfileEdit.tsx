import UserAvatar from "@/components/common/UserAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ProfileImageComponent from "@/pages/Auth/components/ProfileImageComponent";
import { getFriendList } from "@/store/slice/FriendSlice";
import { getUser, getUserById } from "@/store/slice/UserSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProfileEdit = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const authUser = useSelector((state: RootState) => state.auth.user || {});

  // Fetch user
  useEffect(() => {
    if (id) {
      dispatch(getUserById({ id }));
    } else {
      dispatch(getUser());
    }
  }, [id, dispatch]);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };
  const [profile, setProfile] = useState({
    username: authUser.username || "",
    firstName: authUser.firstName || "",
    lastName: authUser.lastName || "",
    gender: authUser.gender || "Other",
    dob: authUser.dob ? formatDate(authUser.dob) : "",
    bio: authUser.bio || "",
    email: authUser.email || "",
    phoneNo: authUser.phoneNo || "",
    profilePicture: authUser.profilePictureUrl || "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (value: string) => {
    setProfile((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save profile logic here (e.g., API call)
    console.log("Profile Updated:", profile);
  };

  const [profileImg, setProfileImg] = useState(profile.profilePicture);

  return (
    <div className="rounded-lg px-6 py-4 bg-gray-50">
      <div className="flex flex-col gap-6">
        <Label className="text-2xl font-bold">Edit Profile</Label>
        <div className="rounded-lg border bg-white p-6 shadow-md">
          {/* Profile Header */}
          <div className="flex flex-row items-center gap-6 pb-4 border-b">
            {/* <UserAvatar size={15} profileImage={profile.profilePicture} username={profile.username} firstName={profile.firstName} lastName={profile.lastName}/>
                        {isEditing && (
                            <Button
                                className="ml-auto"
                                onClick={handleChangeProfilePicture}
                            >
                                Change Profile
                            </Button>
                        )} */}
            {/* Hidden file input */}
            {/* <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePictureChange}
                        /> */}
            <ProfileImageComponent
              profileImg={profileImg}
              setProfileImg={setProfileImg}
              isEditOn={isEditing}
            />
            <div>
              <Label className="text-lg font-semibold">
                {profile.firstName} {profile.lastName}
              </Label>
              <p className="text-sm text-gray-600">{profile.username}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex flex-col gap-4 pt-4">
            {/* First Name and Last Name */}
            <div className="flex flex-row gap-4">
              <Input
                type="text"
                name="firstName"
                value={profile.firstName}
                disabled={!isEditing}
                onChange={handleInputChange}
                placeholder="First Name"
              />
              <Input
                type="text"
                name="lastName"
                value={profile.lastName}
                disabled={!isEditing}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
            </div>

            {/* Bio */}
            <div>
              <Label className="text-md font-semibold">Bio</Label>
              <Textarea
                name="bio"
                value={profile.bio}
                disabled={!isEditing}
                onChange={handleInputChange}
                placeholder="Write a short bio..."
              />
            </div>

            {/* Gender */}
            {/* Gender and Date of Birth */}
            <div className="flex gap-4 mb-4">
              {/* Date of Birth */}
              <div className="flex-1">
                <Label className="text-md font-semibold">Date of Birth</Label>
                {isEditing ? (
                  <Input
                    type="date"
                    name="dob"
                    value={profile.dob || ""}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        dob: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                ) : (
                  <p className="p-2 border rounded text-gray-700">
                    {profile.dob ? profile.dob : "Not set"}
                  </p>
                )}
              </div>
              {/* Gender */}
              <div className="flex-1">
                <Label className="text-md font-semibold">Gender</Label>
                {isEditing ? (
                  <Select
                    value={profile.gender}
                    onValueChange={handleGenderChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="p-2 border rounded text-gray-700">
                    {profile.gender}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Email and Phone Number */}
          <div className="flex gap-4 mb-4">
            {/* Email */}
            <div className="flex-1">
              <Label className="text-md font-semibold">Email</Label>
              {isEditing ? (
                <Input
                  type="email"
                  name="email"
                  value={profile.email || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full"
                />
              ) : (
                <p className="p-2 border rounded text-gray-700">
                  {profile.email || "Not set"}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex-1">
              <Label className="text-md font-semibold">Phone Number</Label>
              {isEditing ? (
                <Input
                  type="tel"
                  name="phone"
                  value={profile.phoneNo || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full"
                />
              ) : (
                <p className="p-2 border rounded text-gray-700">
                  {profile.phoneNo || "Not set"}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
