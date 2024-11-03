import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DollarSign, ArrowRight } from "lucide-react";

export const Signin = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            const response = await axios.post("https://payverse-production.up.railway.app/api/v1/user/signin", {
                userName,
                password
            });
            console.log("Response data:", response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="md:w-1/2 bg-indigo-600 p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center mb-6">
                            <DollarSign className="h-10 w-10 text-white" />
                            <h1 className="text-3xl font-bold text-white ml-2">PayVerse</h1>
                        </div>
                        <p className="text-indigo-100 text-lg mb-6">Your gateway to seamless digital transactions in the metaverse.</p>
                    </div>
                    <div className="bg-indigo-700 rounded-lg p-6 mt-6">
                        <blockquote className="text-white italic">
                        "PayVerse revolutionized how children can play and know about transactions with fake money"
                        </blockquote>
                        <p className="text-indigo-200 mt-2">- Ishaan Saxena: CEO of PayVerse </p>
                    </div>
                </div>
                <div className="md:w-1/2 p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Sign in to your account</h2>
                        <p className="text-gray-600">Enter your credentials to access your PayVerse account</p>
                    </div>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                id="userName"
                                type="email"
                                placeholder="john@example.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </form>
                    <div className="mt-6">
                        <button
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
                            onClick={handleSignin}
                        >
                            Sign In
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                        <p className="text-sm text-gray-500 mt-4">
                            Don't have an account?{" "}
                            <a className="text-indigo-600 hover:underline cursor-pointer" onClick={() => navigate("/signup")}>
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
