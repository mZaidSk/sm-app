import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center "
            style={{
                background: "radial-gradient(circle,#FFFFFF,#fccc83)",//#FFB84D
          // backgroundImage: 'url("/profile-img/p1-cat.jpg")', 
                
            }}
        >
            <Outlet />
        </div>
    );
};

export default AuthLayout;
