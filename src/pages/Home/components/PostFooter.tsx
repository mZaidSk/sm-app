import { useState, useRef } from "react";


const PostFooter = () => {

  return (
    <div className="mb-10 mt-auto bg-white p-4 rounded shadow-sm">
      {/* Like and Comment Icons */}
      <div className="flex items-center gap-4 pt-0 mb-2 mt-4">
        <div className="cursor-pointer text-lg"
        >
          LikoI
        </div>

        <div
          className="cursor-pointer text-lg"  >
         CommentI
        </div>
      </div>

      {/* Likes Count */}
      <p className="font-bold text-sm">{1 || 0} likes</p>

      {/* Posted Date if on Profile Page */}
      
        <p className="text-gray-500 text-xs">
          Posted {new Date().toLocaleDateString()}
        </p>


      {/* Caption and Comments Link */}
     
        <>
          <p className="text-sm font-bold">
            
            <span className="font-normal">{"caption"}</span>
          </p>
          {6 > 0 && (
            <p className="text-sm text-gray-500 cursor-pointer">
              View all {6} comments
            </p>
          )}
        </>
      

      {/* Comment Input */}
      <div className="flex items-center gap-2 w-full mt-4">
        <input
          type="text"
          placeholder="Add a comment..."
          className="border-b border-gray-300 flex-1 px-2 py-1 focus:outline-none focus:border-blue-500 text-sm"
          value="{comment}"
        /*  onChange={(e) => setComment(e.target.value)}
         ref={commentRef}*/
        />
        <button
         
          className="text-blue-500 font-bold text-sm bg-transparent hover:bg-blue-500 hover:text-white px-3 py-1 rounded"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostFooter;



// const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
//     const [comment, setComment] = useState("");
//     const commentRef = useRef(null);
  
//     const handleLikePost = () => {
//       console.log("Liked Post");
//     };
  
//     const handleSubmitComment = () => {
//       console.log("Submitted Comment:", comment);
//       setComment("");
//     };
// return (
//     <div className="mb-10 mt-auto bg-white p-4 rounded shadow-sm">
//       {/* Like and Comment Icons */}
//       <div className="flex items-center gap-4 pt-0 mb-2 mt-4">
//         <div
//           onClick={handleLikePost}
//           className="cursor-pointer text-lg"
//         >
//           {/* Replace with actual icons */}
//           👍 {/* Placeholder for NotificationsLogo/UnlikeLogo */}
//         </div>

//         <div
//           className="cursor-pointer text-lg"
//         //   onClick={() => commentRef.current.focus()}
//         >
//           💬 {/* Placeholder for CommentLogo */}
//         </div>
//       </div>

//       {/* Likes Count */}
//       <p className="font-bold text-sm">{post.likes || 0} likes</p>

//       {/* Posted Date if on Profile Page */}
//       {isProfilePage && (
//         <p className="text-gray-500 text-xs">
//           Posted {new Date(post.createdAt).toLocaleDateString()}
//         </p>
//       )}

//       {/* Caption and Comments Link */}
//       {!isProfilePage && (
//         <>
//           <p className="text-sm font-bold">
//             {creatorProfile?.username}{" "}
//             <span className="font-normal">{post.caption}</span>
//           </p>
//           {post.comments.length > 0 && (
//             <p className="text-sm text-gray-500 cursor-pointer">
//               View all {post.comments.length} comments
//             </p>
//           )}
//         </>
//       )}

//       {/* Comment Input */}
//       <div className="flex items-center gap-2 w-full mt-4">
//         <input
//           type="text"
//           placeholder="Add a comment..."
//           className="border-b border-gray-300 flex-1 px-2 py-1 focus:outline-none focus:border-blue-500 text-sm"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           ref={commentRef}
//         />
//         <button
//           onClick={handleSubmitComment}
//           className="text-blue-500 font-bold text-sm bg-transparent hover:bg-blue-500 hover:text-white px-3 py-1 rounded"
//         >
//           Post
//         </button>
//       </div>
//     </div>
//   );
// };