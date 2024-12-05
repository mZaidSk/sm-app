import Posts from "./Posts/component/Posts";
import SuggestedUsers from "./Suggest/SuggestedUsers";


const HomePage = () => {
    return <div className="container max-w-screen-lg mx-auto ">
    <div className="flex gap-5">
      {/* Centered Posts Component */}
      <div className="flex-grow items-center  py-3">
        <Posts/>
      </div>
      <div className="flex-3 hidden lg:block max-w-xs">
        <SuggestedUsers />
      </div>
    </div>
  </div>;
  
};

export default HomePage;
