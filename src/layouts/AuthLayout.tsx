import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center backdrop-blur-sm bg-[#161618]"
            // style={{
            //     background: "radial-gradient(circle,#161613,#161618)", //#FFB84D
            // }}
        >
            <Outlet />
        </div>
    );
};

export default AuthLayout;
