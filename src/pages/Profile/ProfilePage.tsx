import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile"

// /profile me
// /profile/:username 
const ProfilePage = () => {
    return (
        <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/:username" element={<Profile />} />
        </Routes>
    );
};

export default ProfilePage;

