import Post from "./Post";

const Posts = () => {
    // Simulated loading and posts data for static version
    const isLoading = false;
    const posts = [
      { id: 1, imageURL: "https://via.placeholder.com/600", caption: "First Post" },
      { id: 2, imageURL: "https://via.placeholder.com/600", caption: "Second Post" },
    ];
  
    return (
      <div className="max-w-xl py-4 px-4 flex gap-4 flex-col">
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