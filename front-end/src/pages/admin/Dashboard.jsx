import axios from "axios";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

export function Dashboard() {
    const [userId,setUserId] = useState("");
    const navigate = useNavigate()
    useEffect(()=>{
        async function tryLogin(){
            try{
                const res = await axios.get(`${import.meta.env.VITE_URL}/admin/login`, {
                    headers: {
                        "authorization": localStorage.getItem("canteen-token")
                    }
                });
                setUserId(res.data);
            }catch(err){
                console.log(err);
                navigate("/admin/signin");
            }
        }
        tryLogin();
    },[navigate])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            Dashboard Page
            <div>
                The admin has the id : {userId}
            </div>
        </div>
    );
}