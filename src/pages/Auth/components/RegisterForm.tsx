import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useDispatch } from "react-redux"; // Import useDispatch to dispatch actions
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUp } from 'lucide-react';
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
import { registerUser } from "@/store/slice/AuthSlice";
import { AppDispatch } from "@/store/store";
import { Gender, Status, registerUserParams } from "@/lib/types";
import ProfileImageComponent from './ProfileImageComponent';


const RegisterForm = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }, getValues
    } = useForm<registerUserParams>({
        // mode: "onSubmit", 
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            gender: Gender.Male, // default value for gender
            dob: new Date(), //"",
            password: "",
            profilePictureUrl: "profile-img/p1-cat.jpg",
            status: Status.Active,
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [profileImg, setProfileImg] = useState("")

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);

        if (e.target.value !== getValues("password")) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }
    };

    const profileImgDemo = [
        {
            alt: "img 1 cat img",
            link: "profile-img/p1-cat.jpg"
        },
        {
            alt: "img 1 cat img",
            link: "profile-img/p1-cat.jpg"
        },
        {
            alt: "img 1 cat img",
            link: "profile-img/p1-cat.jpg"
        },
        {
            alt: "img 1 cat img",
            link: "profile-img/p1-cat.jpg"
        },


    ]

    const onSubmit = (data:registerUserParams) => {
        console.log(data);

        // Dispatch login action
        dispatch(registerUser({
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNo: data.phoneNo,
            gender: data.gender,
            dob: data.dob,
            password: data.password,
            profilePictureUrl: profileImg,
            status: Status.Active,
        }))
            .unwrap()
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.error("Registration failed", error);
            });
    };

    return (
        <Card className="w-full max-w-3xl shadow-xl px-4 ">
    <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-blue-900 font-serif">Register</CardTitle>
        <CardDescription className="text-sm text-gray-800">
            Create a new account
        </CardDescription>
    </CardHeader>
    <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                {/* Profile Image, Name, and Username */}
                <div className="flex items-start space-x-4">
                    {/* Profile Image */}
                    <ProfileImageComponent/>
                    {/* <div className="relative w-28 h-28">
                        <img
                            src={profileImg || "profile-img/p1-cat.jpg"} 
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover border border-gray-300"
                        />
                        
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
                            <input
                                type="image"//file
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                   
                                }}
                            />
                            +
                        </label>
                        </div> */}

                    {/* fisrtname and surname */}
                    <div className="flex-1">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="First Name"
                                    {...register("firstName", { required: "First Name is required" })}
                                />
                                {errors.firstName && (
                                    <span className="text-red-500 text-sm">{errors.firstName.message?.toString()}</span>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Last Name"
                                    {...register("lastName", { required: "Last Name is required" })}
                                />
                                {errors.lastName && (
                                    <span className="text-red-500 text-sm">{errors.lastName.message?.toString()}</span>
                                )}
                            </div>
                        </div>

                        {/* Username */}
                        <div className="mt-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Username"
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && (
                                <span className="text-red-500 text-sm">{errors.username.message?.toString()}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* DOB and Gender */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                            id="dob"
                            type="date"
                            {...register("dob", {
                                required: "Date of Birth is required",
                                validate: (value) => {
                                    const today = new Date();
                                    const dob = new Date(value);
                                    const ageDiff = today.getFullYear() - dob.getFullYear();
                                    const isEligible =
                                        ageDiff > 18 ||
                                        (ageDiff === 18 &&
                                            (today.getMonth() > dob.getMonth() ||
                                                (today.getMonth() === dob.getMonth() &&
                                                    today.getDate() >= dob.getDate())));
                                    return isEligible || "You must be 18 years or older";
                                },
                            })}
                        />
                        {errors.dob && (
                            <span className="text-red-500 text-sm">{errors.dob.message?.toString()}</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="gender">Gender</Label>
                        <select
                            id="gender"
                            {...register("gender", { required: "Gender is required" })}
                            className="border rounded px-2 py-1 w-full"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && (
                            <span className="text-red-500 text-sm">{errors.gender.message?.toString()}</span>
                        )}
                    </div>
                </div>

                {/* Email and Phone Number */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message?.toString()}</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="phoneNo">Phone Number</Label>
                        <Input
                            id="phoneNo"
                            placeholder="Phone Number"
                            {...register("phoneNo", { required: "Phone Number is required" })}
                        />
                        {errors.phoneNo && (
                            <span className="text-red-500 text-sm">{errors.phoneNo.message?.toString()}</span>
                        )}
                    </div>
                </div>

                {/* Password and Confirm Password */}
                <div className="grid grid-cols-2 gap-2">
                    <div className='relative'>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })}
                        />
                        <button
                                    type="button"
                                    className="absolute inset-y-10 px-3 right-0  flex items-center  text-gray-600 hover:text-gray-800"
                                    onClick={() => setShowPassword(!showPassword)}
                                >{showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                                    {/* {showPassword ? "Hide" : "Show"} */}
                                </button>

                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message?.toString()}</span>
                        )}
                    </div>
                    <div className='relative'>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <button
                                type="button"
                                className="absolute inset-y-10 px-3 right-0  flex items-center  text-gray-600 hover:text-gray-800"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >{showConfirmPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                                {/* {showConfirmPassword ? "Hide" : "Show"} */}
                            </button>

                        {confirmPasswordError && (
                            <span className="text-red-500 text-sm">{confirmPasswordError}</span>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="w-[35%] h-auto text-white text-lg font-bold mt-3 py-2 rounded-lg hover:bg-zinc-800 transition duration-300"
                    >
                        Register
                    </Button>
                </div>
            </div>
        </form>
    </CardContent>
    <CardFooter className="flex justify-center items-center">
        <p className="text-sm text-center">
            Already have an account?
            <Link to="/login" className="text-black-500 hover:underline font-bold">
               Log In
            </Link>
             {/* <a href="/login" className="text-blue-500 hover:underline font-bold">Log in</a> */}
        </p>
    </CardFooter>

</Card>

    );
};



export default RegisterForm;