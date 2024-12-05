import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: 'url("/profile-img/p1-cat.jpg")', // Replace with your image URL
            }}
        >
            <Outlet />
        </div>
    );
};

export default AuthLayout;
