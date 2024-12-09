import UserAvatar from "@/components/common/UserAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getUser, getUserById } from "@/store/slice/UserSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const GeneralHelp = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve the id from the route
  const dispatch = useDispatch<AppDispatch>();
  const userSelector = useSelector(
    (state: RootState) => state.user.user || {}
  );

  useEffect(() => {
    if (id) {
      fetchUserInfoById(id);
    } else {
      fetchUserInfo();
    }
  }, [id]);

  const fetchUserInfo = () => {
    dispatch(getUser());
  };

  const fetchUserInfoById = (id: string) => {
    // Dispatch action for fetching user info based on id
    dispatch(getUserById({ id }));
  };
  const [problem, setProblem] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim() === "") {
      alert("Please enter a problem before submitting.");
      return;
    }
    // Handle submission logic here
    console.log("Problem submitted:", problem);
    alert("Problem submitted successfully!");
    setProblem(""); // Clear the input after submission
  };

  return <div className="m-4  p-6">
    <Label className="text-lg mb-3">Help</Label>
    <div className="flex flex-row items-center gap-6 p-2 mt-3 border-b">
      <div className="flex items-center space-x-4">
        <Avatar className={"w-[8%] h-[8%]"}>
          <AvatarImage src={userSelector.profilePictureUrl} alt="Profile Picture" />
          <AvatarFallback>{userSelector?.username?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <Label className="text-lg font-semibold">
            {userSelector.firstName} {userSelector.lastName}
          </Label>
          <p className="text-sm text-gray-600">{userSelector.username}</p>
        </div>
      </div>
      {/* <UserAvatar size={10} profileImage={userSelector.profilePictureUrl} username={userSelector.username} firstName={userSelector.firstName} lastName={userSelector.lastName}/> */}
    </div>
    <div className="my-5 w-full ">
      <h1 className="text-2xl font-bold mb-6">Submit Your Problem</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full space-y-4 flex flex-col"
      >
        <div className="space-y-2 flex-grow ">
          <Label htmlFor="problem" className="text-sm font-medium text-gray-700">
            Describe Your Problem:
          </Label>
          <Textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Enter your problem here..."
            className="w-full h-36"
          
          />
        </div>
        <Button type="submit" className="w-fit self-end mt-4">
          Submit
        </Button>
      </form>
    </div>

  </div>;
};

export default GeneralHelp;
