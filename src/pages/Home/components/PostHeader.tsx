import { Link } from "react-router-dom";

  
const PostHeader = () => {

    const isFollowing = false;

  return (
    <div className="flex justify-between items-center w-full my-2">
      {/* Left Section: User Avatar and Info */}
      <div className="flex items-center gap-2">
        
          <Link to={`/${"creatorProfile.username"}`}>
            <img
              src={"creatorProfile.profilePicURL"}
              alt="user profile pic"
              className="w-8 h-8 rounded-full"
            />
          </Link>
       

        <div className="flex flex-col text-sm font-bold gap-1">
          
            <Link to={`/${"creatorProfile.username"}`} className="hover:underline">
              {"creatorProfile"}
            </Link>
          
          <span className="text-gray-500 text-xs">
            • {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Right Section: Follow/Unfollow Button */}
      <div>
        <button
        //   onClick={handleFollowUser}
          className={`text-blue-500 font-bold text-xs px-3 py-1 rounded hover:text-white hover:bg-blue-500 transition`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default PostHeader;

// const PostHeader = ({ post, creatorProfile }) => {
//     const isFollowing = false; // Static value for demonstration
//     const isUpdating = false; // Static value for demonstration
  
//     const handleFollowUser = () => {
//       console.log("Follow/Unfollow button clicked");
//     };
  
//     return (
//       <div className="flex justify-between items-center w-full my-2">
//         {/* Left Section: User Avatar and Info */}
//         <div className="flex items-center gap-2">
//           {creatorProfile ? (
//             <Link to={`/${creatorProfile.username}`}>
//               <img
//                 src={creatorProfile.profilePicURL}
//                 alt="user profile pic"
//                 className="w-8 h-8 rounded-full"
//               />
//             </Link>
//           ) : (
//             <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
//           )}
  
//           <div className="flex flex-col text-sm font-bold gap-1">
//             {creatorProfile ? (
//               <Link to={`/${creatorProfile.username}`} className="hover:underline">
//                 {creatorProfile.username}
//               </Link>
//             ) : (
//               <div className="w-24 h-2 bg-gray-300 animate-pulse"></div>
//             )}
//             <span className="text-gray-500 text-xs">
//               • {new Date(post.createdAt).toLocaleDateString()}
//             </span>
//           </div>
//         </div>
  
//         {/* Right Section: Follow/Unfollow Button */}
//         <div>
//           <button
//             onClick={handleFollowUser}
//             className={`text-blue-500 font-bold text-xs px-3 py-1 rounded hover:text-white hover:bg-blue-500 transition ${
//               isUpdating ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isFollowing ? "Unfollow" : "Follow"}
//           </button>
//         </div>
//       </div>
//     );
//   };

