import AvatarContainer from '@/components/common/AvatarConatiner';

interface CommentItemProps {
    id:number;
  user: string;
  content: string;
  datePosted: string;
  profileImage: URL;
}

const CommentItem: React.FC<CommentItemProps> = ({ id,user, content, datePosted, profileImage }) => {
  return (
    <div key={id}className="comment-item border-b p-2 flex space-x-2 rounded-lg shadow-md bg-white">
      {/* User Profile */}
      <AvatarContainer username={user} profileImage={profileImage} />
      <div className="flex-1">
        <div>
          {/* User Name */}
          <p className="font-semibold">{user}</p>
          {/* Date Posted */}
          <p className="text-xs text-gray-500">{datePosted}</p>
        </div>
        {/* Comment Content */}
        <div className="mt-1 w-64">
          <p className="break-words">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
