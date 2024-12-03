import Posts from "./components/Posts";

const HomePage = () => {
    return <div className="container max-w-screen-lg mx-auto">
    <div className="flex gap-5">
      <div className="flex-grow py-10 bg-red-500">
        <Posts/>
      </div>
      <div className="flex-3 mr-20 hidden lg:block max-w-xs">
        SuggestedUsers
      </div>
    </div>
  </div>;
  
};

export default HomePage;
