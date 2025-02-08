"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FlashBanner from "@/app/components/common/FlashBanner";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import login from "@/app/components/images/login.png"
import p from "@/app/components/images/p.svg"
import Patryx from "@/app/components/images/Patryx.svg"
import TransparentForm from "@/app/components/images/transparentForm.png"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const apiUrl =
            "https://school-project-backend-p17b.onrender.com/api/v1/auth/login";
        const data = { email, password };
        try {
            const response = await axios.post(apiUrl, data);
            const token = response.data.data.token;
            localStorage.setItem("jwt", response.data.data.token)

            if (token) {
                setSuccess("Login Successful");
                setIsLoading(false);
                router.push(`/dashboard`);
            } else {
                setIsLoading(false);
                console.error("Token not found in the response");
                setError("Network Error");
            }
        } catch (error) {
            console.error("Error during login:", error.response?.data.message);
            setError(error.response?.data.message);
            setIsLoading(false);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <>
            {error && (
                <FlashBanner
                    message={error}
                    type="error"
                    onClose={() => setError(null)}
                />
            )}
            {success && (
                <FlashBanner
                    message={success}
                    type="success"
                    onClose={() => setSuccess(null)}
                />
            )}

            <div className="flex flex-col sm:flex-row min-h-screen">
                {/* Left Section */}
                <div className="sm:w-1/2 flex items-center justify-center p-8 patryx-login">
                    <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
                        <Image src={login} alt="login-img" />
                        <div className="mt-5 text-center tracking-tight text-gray-700">
                            <div className="flex justify-center">
                                <Image src={p} alt="p-logo" />
                                <Image src={Patryx} alt="patryx-logo" />
                            </div>
                            <p className="mt-5 text-center tracking-tight text-blue-900">
                                Empowering innovation, transforming ideas into solutions that elevate businesses and simplify lives.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="sm:w-1/2 flex items-center justify-center p-8" style={{
                    backgroundImage: `url(${TransparentForm.src})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    margin: "90px 20px",
                    backgroundColor: "#0705A2",
                    borderRadius: "10px"
                }}>
                    <div
                        className="w-full max-w-md p-6 rounded-md shadow-lg"
                        style={{ background: "#F7F7FA" }}
                    >
                        <h1 className="text-2xl font-bold text-center text-gray-900">Welcome Back!</h1>
                        <p className="text-gray-600 mb-10 text-center">Enter your credentials to get access</p>
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm mb-4 font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 p-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Enter your email"
                                    required
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className="mt-1 mb-6 p-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Enter your password"
                                    required
                                    onChange={handlePasswordChange}
                                />
                                <span
                                //   className="absolute inset-y-0 right-3 top-8 flex items-center cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                                >
                                {showPassword ? '🙈' : '👁️'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-sm text-blue-600 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            {isLoading && <LoadingSpinner />}
                            <br />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
                            >
                                Log in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
