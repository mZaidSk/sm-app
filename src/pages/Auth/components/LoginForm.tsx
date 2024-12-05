import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useDispatch } from "react-redux"; // Import useDispatch to dispatch actions
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/store/slice/AuthSlice";
import { AppDispatch } from "@/store/store";

export function LoginForm() {
    const dispatch = useDispatch<AppDispatch>(); // Initialize useDispatch
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "johndoe@example.com", // Set initial value for username
            password: "securepassword123", // Set initial value for password
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const onSubmit = (data: any) => {
        console.log(data);

        // Dispatch login action
        dispatch(loginUser({ email: data.email, password: data.password }))
            .unwrap() // Ensure we handle success/failure
            .then(() => {
                // After successful login, navigate to the home page
                navigate("/"); // Redirect to '/'
            })
            .catch((error) => {
                // Handle login failure (optional)
                console.error("Login failed", error);
            });
    };

    return (
        <Card className="w-[350px] ">
            <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold font-serif text-zinc-900">Login</CardTitle>
                <CardDescription>
                    Access your account by logging in.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email.message ||
                                        "Email is required"}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-red-500 text-sm">
                                    {errors.password.message ||
                                        "Password is required"}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <Button type="submit" className="w-[50%] h-auto text-white text-lg font-bold  py-2 rounded-lg hover:bg-zinc-800 transition duration-300 ">Login</Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center items-center ">
            <p className="text-sm text-center">
                    Don't have an account?{" "}
                    <Link to="register" className="text-zinc-700 hover:underline font-bold mx-2">
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
