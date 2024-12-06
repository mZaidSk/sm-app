import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import ProfilePosts from "./components/ProfilePosts";

const ProfilePage = () => {
    return (
        <Routes>
            {/* Parent route for logged-in user's profile */}
            <Route path="/" element={<Profile />}>
                {/* <Route index element={<ProfilePosts />} /> Default route */}
                {/* <Route path="posts" element={<ProfilePosts />} />
                <Route path="text-posts" element={<ProfilePosts />} /> */}
                {/* <Route path="tagged" element={<Profile activeTab="tagged" />} /> */}
            </Route>

            {/* Parent route for other user's profile */}
            <Route path="/:id" element={<Profile />}>
                {/* <Route path="posts" element={<Profile activeTab="posts" />} />
                <Route path="saved" element={<Profile activeTab="saved" />} />
                <Route path="tagged" element={<Profile activeTab="tagged" />} /> */}
            </Route>
        </Routes>
    );
};

export default ProfilePage;
