import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface FollowButtonProps {
    isFollowing: boolean;
    onFollow: () => void;
    onUnfollow: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing, onFollow, onUnfollow }) => {
    const [showDialog, setShowDialog] = useState(false);

    return isFollowing ? (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-gray-200 py-2 px-4 rounded-lg">Following</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. You will no longer follow this user.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            onUnfollow();
                            setShowDialog(false);
                        }}
                    >
                        Unfollow
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ) : (
        <Button
            className="bg-zinc-700 text-white py-2 px-4 rounded-lg"
            onClick={onFollow}
        >
            Follow
        </Button>
    );
};

export default FollowButton;
