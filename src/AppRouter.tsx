import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./pages/Auth/AuthPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home/HomePage";
import ChatPage from "./pages/Chat/ChatPage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import ProfilePage from "./pages/Profile/ProfilePage";

function AppRouter() {
    const [auth, setAuth] = useState(false);
    const authSelector = useSelector((state: RootState) => state.auth);


    // useEffect(() => {
    //     const checkAuth = async () => {
    //         const token = localStorage.getItem("accessToken");
    //         setAuth(!!token);
    //     };
    //     checkAuth();
    // }, [authSelector.user]);

    if (authSelector.loading) {
        // Show the loader while checking authentication
        return <h1>Loading....</h1>;
    }

    return (
        <BrowserRouter>
            <Routes>
                {auth ? (
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/chat/*" element={<ChatPage />} />
                        <Route path="/profile/*" element={<ProfilePage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                ) : (
                    <Route element={<AuthLayout />}>
                        <Route path="/auth/*" element={<AuthPage />} />
                        <Route path="*" element={<Navigate to="/auth" />} />
                    </Route>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
