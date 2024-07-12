
import {Heading} from "../../components/Heading.jsx"
import {Button} from "../../components/Button.jsx"
import {InputBox} from "../../components/InputBox.jsx"
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {AlertBox} from "../../components/AlertBox.jsx"

export function SignIn(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function SignInHelper (){
        try{
            const res = await axios.post("http://localhost:3000/api/v1/admin/login", {
                email : email,
                password : password
            });
            
            if(res.status == 200){
                localStorage.setItem("token", res.data.token);
                AlertBox(1);
            }else{
                console.log(res.data);
                AlertBox(2);
            }
        }catch(err){
            console.log(err.response.data);
            AlertBox(2);
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

                <div className="flex justify-center mt-5 font-semibold text-sm text-gray-600">
                    <Link to={"/signup"}> Don't have an Account? </Link>
                </div>
            </div>      
        </div>
    );
}