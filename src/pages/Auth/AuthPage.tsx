import { Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";

const AuthPage = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginForm />} />
            {/* <Route path="register" element={<RegisterForm />} /> */}
        </Routes>
    );
};

export default AuthPage;
