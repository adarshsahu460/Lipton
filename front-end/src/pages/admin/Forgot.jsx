

import {Heading} from "../../components/Heading.jsx"
import {Button} from "../../components/Button.jsx"
import {InputBox} from "../../components/InputBox.jsx"
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {AlertBox} from "../../components/AlertBox.jsx"

export function Forgot(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [otp, setOtp] = useState("");

    async function ForgotHelper (){
        try{
            if(password == "" || (password != cpassword)){
                AlertBox(2); return;
            }

            const res = await axios.post("http://localhost:3000/api/v1/admin/verify", {
                email : email,
                otp : otp
            });

            if(res.status != 200){
                AlertBox(2); return;
            }

            const res1 = await axios.put("http://localhost:3000/api/v1/admin/updatePass", {
                email : email,
                password : password
            });

            if(res.status != 200){
                AlertBox(2); return;
            }

            AlertBox(1);
        }catch(err){
            AlertBox(2);
        }
    }

    async function getOTP(){
        console.log(email);
        const res = await axios.post("http://localhost:3000/api/v1/admin/forgot", {
            email : email
        });

        if(res.status == 200){
            AlertBox(1);
        }else{
            AlertBox(0);
        }

    }

    return (
        <div className="bg-gray-400 h-screen flex justify-center items-center">
            <div className="bg-white rounded-md p-8 w-[400px]">
                <Heading text={"Update"} />
                
                <div className="flex items-end justify-between">
                    <InputBox label={"Email"} placeholder={"Enter Email"} type={"email"} onClick={(e)=> { setEmail(e.target.value) }} />
                    <div className="pb-3">    
                        <Button text={"Get OTP"} onClick={() => {
                            getOTP();
                        }} />
                    </div>
                </div>

                <InputBox label={"OTP"} placeholder={"Enter OTP"} type={"text"} onClick={(e)=> { setOtp(e.target.value) }} />
                <InputBox label={"New Password"}placeholder={"Enter password"} type={"password"} onClick={(e)=> { setPassword(e.target.value) }} />
                <InputBox label={"Conform Password"}placeholder={"Enter password"} type={"password"} onClick={(e)=> { setCPassword(e.target.value) }} />
                <Button text={"Let's Go"}  onClick={()=>{
                    ForgotHelper();
                }} />

                <div className="flex justify-center mt-5 font-semibold text-sm text-gray-600">
                    <Link to={"admin/signin"}> Go To Login </Link>
                </div>
            </div>      
        </div>
    );
}