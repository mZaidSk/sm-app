import Post from "./Post";


  
const Posts = () => {
  // Simulated loading and posts data for static version
  const isLoading = false;
  const posts = [
    { id: 1, imageURL: "https://via.placeholder.com/600", caption: "First Post" },
    { id: 2, imageURL: "https://via.placeholder.com/600", caption: "Second Post" },
  ];

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      {/* Skeleton Loader for Loading State */}
      
      {/* Render Posts */}
      <Post/>
      <Post/>
      <Post/>
      <Post/>

      
    </div>
  );
};

export default Posts;




// const Posts = () => {
//     // Simulated loading and posts data for static version
//     const isLoading = false;
//     const posts = [
//       { id: 1, imageURL: "https://via.placeholder.com/600", caption: "First Post" },
//       { id: 2, imageURL: "https://via.placeholder.com/600", caption: "Second Post" },
//     ];
  
//     return (
//       <div className="max-w-lg mx-auto py-10 px-4">
//         {/* Skeleton Loader for Loading State */}
//         {isLoading &&
//           [0, 1, 2].map((_, idx) => (
//             <div key={idx} className="space-y-4 mb-10">
//               <div className="flex gap-4">
//                 <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
//                 <div className="space-y-2">
//                   <div className="h-2 w-48 bg-gray-300 rounded animate-pulse"></div>
//                   <div className="h-2 w-48 bg-gray-300 rounded animate-pulse"></div>
//                 </div>
//               </div>
//               <div className="w-full h-96 bg-gray-300 rounded animate-pulse"></div>
//             </div>
//           ))}
  
//         {/* Render Posts */}
//         {!isLoading && posts.length > 0 && posts.map((post) => <Post key={post.id} post={post} />)}
  
//         {/* No Posts Message */}
//         {!isLoading && posts.length === 0 && (
//           <div className="text-center text-red-500">
//             <p className="text-md">Dayuum. Looks like you don’t have any friends.</p>
//             <p>Stop coding and go make some!!</p>
//           </div>
//         )}
//       </div>
//     );
//   };