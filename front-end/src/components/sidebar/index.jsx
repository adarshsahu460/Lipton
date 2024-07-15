import React from "react"
import Logo from "../../assets/images/logo.png"
import Button from '@mui/material/Button';
import { MdOutlineDashboard, MdProductionQuantityLimits, MdKeyboardArrowRight } from "react-icons/md";


function MenuItem(title, icon){
    return (
        <div className="side-menu py-1 pl-3 flex items-center">
            <Button className="w-100 items-center"> 
                <div className="flex items-center">
                    <span className="icon w-[30px] h-[30px] flex items-center justify-center rounded-md "> {icon}  </span>
                    {title} 
                </div>
                <div className="w-[30px] h-[30px] flex pt-1">
                    <MdKeyboardArrowRight />
                </div>
            </Button>
           
        </div>
    );
}

export default function SideBar(){
    return <>
        <div className="sidebar fixed top-0 left-0 z-[100] h-full ">
            <div className="border flex justify-center items-center py-2">
                <img src={Logo} alt="Logo Image" className="w-16" />
                <div className="text-2xl font-bold pl-1 ">
                    LIFTEN
                </div>
            </div>
            {MenuItem("DashBoard", <MdOutlineDashboard />, )}
            {MenuItem("Products", <MdProductionQuantityLimits />, )}
            {MenuItem("Billing", <MdProductionQuantityLimits />, )}
            {MenuItem("Users", <MdProductionQuantityLimits />, )}
        </div>
    </>
}