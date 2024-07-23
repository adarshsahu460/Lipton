import React from "react";
import Logo from "../../assets/images/logo.png";
import Button from "@mui/material/Button";
import { MdOutlineDashboard, MdProductionQuantityLimits, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function MenuItem({ title, icon, link }) {
    const navigate = useNavigate();

    return (
        <Button
            className="menu-item flex items-center p-3 mb-2 rounded-lg hover:bg-gray-100 text-gray-800 transition-colors duration-300"
            onClick={() => navigate(link)}
        >
            <span className="icon w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 mr-4">
                {icon}
            </span>
            <span className="text-md font-medium">{title}</span>
            <MdKeyboardArrowRight className="ml-auto text-gray-400" />
        </Button>
    );
}

export default function SideBar() {
    return (
        <div className="sidebar fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-md border-r border-gray-300">
            <div className="flex items-center p-4 border-b border-gray-300">
                <img src={Logo} alt="Logo" className="w-12 h-12" />
                <div className="text-xl font-semibold ml-3 text-gray-900">LIFTEN</div>
            </div>
            <div className="flex flex-col p-4 space-y-2">
                {/* Uncomment this line if you want to use the Dashboard menu item */}
                {/* <MenuItem title="Dashboard" icon={<MdOutlineDashboard />} link="home" /> */}
                <MenuItem title="Home" icon={<MdProductionQuantityLimits />} link="" />
                <MenuItem title="Products" icon={<MdProductionQuantityLimits />} link="manage" />
                <MenuItem title="Billing" icon={<MdProductionQuantityLimits />} link="bill" />
                <MenuItem title="Users" icon={<MdProductionQuantityLimits />} link="users" />
                <MenuItem title="Gallery" icon={<MdProductionQuantityLimits />} link="gallery" />
            </div>
        </div>
    );
}