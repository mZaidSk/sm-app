import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

// Lazy-loaded components
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const AuthPage = React.lazy(() => import("./pages/Auth/AuthPage"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const HomePage = React.lazy(() => import("./pages/Home/HomePage"));
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"));
const ProfilePage = React.lazy(() => import("./pages/Profile/ProfilePage"));
const PostPage = React.lazy(() => import("./pages/Post/PostPage"));

function AppRouter() {
    const [auth, setAuth] = useState(true);
    const authSelector = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            setAuth(!!token);
        };
        checkAuth();
    }, [authSelector.user]);

    if (authSelector.loading) {
        // Show the loader while checking authentication
        return <h1>Loading....</h1>;
    }

    return (
        <BrowserRouter>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Routes>
                    {auth ? (
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/chat/*" element={<ChatPage />} />
                            <Route
                                path="/profile/*"
                                element={<ProfilePage />}
                            />
                            <Route path="/post/*" element={<PostPage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Route>
                    ) : (
                        <Route element={<AuthLayout />}>
                            <Route path="/auth/*" element={<AuthPage />} />
                            <Route path="*" element={<Navigate to="/auth" />} />
                        </Route>
                    )}
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default AppRouter;
