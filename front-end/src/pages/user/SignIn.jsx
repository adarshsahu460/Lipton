
import {Heading} from "../../components/Heading.jsx"
import {Button} from "../../components/Button.jsx"
import {InputBox} from "../../components/InputBox.jsx"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {AlertBox} from "../../components/AlertBox.jsx"

export function SignIn(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigate();
    const URL = import.meta.env.VITE_PUBLIC_URL

    useEffect(()=>{
        axios.get(URL+"/user/login",{withCredentials:true}).then(()=>{
            navigation('/user/dashboard')
        }).catch((e)=>{})   
    },[])

    async function SignInHelper (){ 
        try{
            const res = await axios.post(URL+"/user/login", {
                email : email,
                password : password
            },{
                withCredentials:true
            });            
            AlertBox(1,"Login Successfull");
            navigation('/user/dashboard')
        }catch(err){
            AlertBox(2,err.response.data.message);
        }
    }

    return (
        <div className="bg-gray-400 h-screen flex justify-center items-center">
            <div className="bg-white rounded-md p-8 w-80">
                <Heading text={"Sign In"} />
                <InputBox label={"Email"} placeholder={"Enter Email"} type={"email"} onClick={(e)=> { setEmail(e.target.value) }} />
                <InputBox label={"Password"}placeholder={"Enter password"} type={"password"} onClick={(e)=> { setPassword(e.target.value) }} />
                <Button text={"Let's Go"}  onClick={()=>{
                    SignInHelper();
                }} />
                <div className="flex justify-center mt-4 mb-3 font-semibold text-sm text-gray-600">
                    <Link to={"/user/forgot"}> Forgot Password </Link>
                </div>
                <div className="flex justify-center font-semibold text-sm text-gray-600">
                    <Link to={"/user/signup"}> Don't have an Account? </Link>
                </div>
            </div>      
        </div>
    );
}