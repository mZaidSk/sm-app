import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";




const Post = () => {
  return (
    <div className="w-full">
      {/* Post Header */}
      <PostHeader />

      {/* Post Image */}
      <div className="my-2 rounded overflow-hidden">
        <img
          src={"post.imageURL"}
          alt="FEED POST IMG"
          className="w-full object-cover"
        />
      </div>

      {/* Post Footer */}
      <PostFooter/>
    </div>
  );
};

export default Post;


// const Post = ({ post }) => {
//     const userProfile = {
//       // Simulated data for static version
//       username: "sampleUser",
//       profilePicURL: "https://via.placeholder.com/150",
//     };
    
  
//     return (
//       <div className="w-full">
//         {/* Post Header */}
//         <PostHeader post={post} creatorProfile={userProfile} />
  
//         {/* Post Image */}
//         <div className="my-2 rounded overflow-hidden">
//           <img
//             src={post.imageURL}
//             alt="FEED POST IMG"
//             className="w-full object-cover"
//           />
//         </div>
  
//         {/* Post Footer */}
//         <PostFooter post={post} creatorProfile={userProfile} />
//       </div>
//     );
//   };


