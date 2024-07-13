
import {Heading} from "../../components/Heading.jsx"
import {Button} from "../../components/Button.jsx"
import {InputBox} from "../../components/InputBox.jsx"
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {AlertBox} from "../../components/AlertBox.jsx"

export function SignUp(){

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");

    function getAlert(type,msg){
        AlertBox(type,msg);
    }

    async function SignUpHelper (){
        try{
            const res = await axios.post(`${import.meta.env.VITE_URL}/admin/register`, {
                email : email,
                password : password,
                mobile : mobile,
                name : name
            });
            localStorage.setItem("canteen-token", res.data.token);
            getAlert(1,"Signed up successfully");
        }catch(err){
            getAlert(2,err.response.data.message);
        }
    }

    return (
        <div className="bg-gray-400 h-screen flex justify-center items-center">
            <div className="bg-white rounded-md p-8 w-80">
                <Heading text={"Sign Up"} />
                <InputBox label={"Name"}placeholder={"Enter name"} type={"text"} onClick={(e)=> { setName(e.target.value) }} />
                <InputBox label={"Email"}placeholder={"Enter Email"} type={"email"} onClick={(e)=> { setEmail(e.target.value) }} />
                <InputBox label={"Mobile No"}placeholder={"Enter mobile"} type={"text"} onClick={(e)=> { setMobile(e.target.value) }} />
                <InputBox label={"Password"}placeholder={"Enter password"} type={"password"} onClick={(e)=> { setPassword(e.target.value) }} />
                <Button text={"Let's Go"}  onClick={()=>{
                    SignUpHelper();
                }} />
                <div className="flex justify-center mt-5 font-semibold text-sm text-gray-600">
                    <Link to={"/signin"}> Already have an Account? </Link>
                </div>
            </div>      
        </div>
    );
}