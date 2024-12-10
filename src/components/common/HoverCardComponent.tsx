import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import UserProfileCard from "@/pages/Home/components/UserCardProfile";

interface HoverCardProps {
    name: string;
    username: string;
    profileImage: string;
    isFollowing: boolean;
    noOfPost: number;
    noOfFriends: number;
}

const HoverCardComponent: React.FC<HoverCardProps> = ({
    name,
    username,
    profileImage,
    isFollowing,
    noOfPost,
    noOfFriends,
}) => {
    return (
        <div>
            <HoverCard>
                {/* <HoverCardTrigger asChild>
                </HoverCardTrigger> */}
                    <div className="font-semibold cursor-pointer">{name}</div>
                <UserProfileCard
                    name={name}
                    username={username}
                    profileImage={profileImage}
                    isFollowing={isFollowing}
                    noOfPost={noOfPost}
                    noOfFriends={noOfFriends}
                />
            </HoverCard>
            {/* <div className="font-semibold">{name}</div> */}
            <div className="text-sm text-gray-500">{username}</div>
        </div>
    );
};

export default HoverCardComponent;
