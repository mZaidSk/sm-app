import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface AvatarProps {
    username: string;
    profileImage: string;
}

const AvatarContainer: React.FC<AvatarProps> = ({
    username,
    profileImage,
}) =>{
    return (
        <Avatar className="z-0">
            <AvatarImage
                src={profileImage}
                alt={username}
                className="z-0"
            />
            <AvatarFallback>
                {username.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}

export default AvatarContainer;