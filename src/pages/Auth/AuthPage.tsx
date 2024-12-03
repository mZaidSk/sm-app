import { Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AuthLayout from "@/layouts/AuthLayout";

const AuthPage = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
            </Route>
        </Routes>
        
    );
};

export default AuthPage;
