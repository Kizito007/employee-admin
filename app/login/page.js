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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const apiUrl =
      "https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/auth/login";
    const data = { username, password };
    try {
      const response = await axios.post(apiUrl, data);

      const token = response.data.data.jwt;
      if (token) {
        setSuccess("Login Successful");
        setIsLoading(false);
        await axios.post(
          "https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/auth/send-email-token",
          {email: response.data.data.email}
        );
        localStorage.setItem("adminId", response.data.data.adminId)
        router.push(`/admin/otp?adminId=${response.data.data.adminId}`);
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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
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
      <div className="sm:w-1/2 flex items-center justify-center p-8">
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
          <form>
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
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 mb-6 p-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
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
            <br/>
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


      {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image src={login} alt="login-img" />
          <div className="mt-5 text-center tracking-tight text-gray-700">
            <div className="flex">
            <Image src={p} alt="login-img" />
            <Image src={Patryx} alt="login-img" />
            </div>
          <p className="mt-5 text-center tracking-tight text-blue-900">
            Empowering innovation, transforming ideas into solutions that elevate businesses and simplify lives.
            </p>
          </div>
        </div>

        <div>
          <form onSubmit={submit} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                  onChange={handleUsernameChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            {isLoading && <LoadingSpinner />}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-950 px-3 p-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
}
