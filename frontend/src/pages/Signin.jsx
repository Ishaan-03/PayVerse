import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
    const [userName, setUserName] = useState(""); 
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate(); 

    const handleSignin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
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
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox 
                        placeholder="Enter Your E-mail" 
                        label={"Email"} 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <InputBox 
                        placeholder="Enter Your Password" 
                        label={"Password"} 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="pt-4">
                        <Button onClick={handleSignin} label={"Sign in"} />
                    </div>
                    <BottomWarning 
                        label={"Don't have an account?"} 
                        buttonText={"Sign up"} 
                        to={"/signup"} 
                    />
                </div>
            </div>
        </div>
    );
};
