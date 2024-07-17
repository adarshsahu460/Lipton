
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

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/admin/login",{withCredentials:true}).then(()=>{navigation('/admin/dashboard/bill')}).catch((e)=>{
            
        })

    },[])

    async function SignInHelper (){
        try{
            const res = await axios.post("http://localhost:3000/api/v1/admin/login", {
                email : email,
                password : password
            },{
                withCredentials:true
            });            
            AlertBox(1,"Login Successfull");
            navigation('/admin/dashboard/bill')
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

                <div className="flex justify-center mt-4 font-semibold text-sm text-gray-600">
                    <Link to={"/admin/signup"}> Don't have an Account? </Link>
                </div>
                <div className="flex justify-center mt-5 font-semibold text-sm text-gray-600">
                    <Link to={"/admin/forgot"}> Forgot Password </Link>
                </div>
            </div>      
        </div>
    );
}