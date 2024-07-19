import React from "react";
import Logo from "../../assets/images/logo.png";
import Button from "@mui/material/Button";
import { MdOutlineDashboard, MdProductionQuantityLimits, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function MenuItem({ title, icon, link }) {
  const navigate = useNavigate();

  return (
    <div className="side-menu py-1 pl-3 flex items-center">
      <Button
        className="w-full items-center hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
        onClick={() => {
          navigate(link);
        }}
      >
        <div className="flex items-center">
          <span className="icon w-10 h-10 text-indigo-500 rounded-full flex items-center justify-center transition duration-300 ease-in-out">
            {icon}
          </span>
          <span className="pl-3">{title}</span>
        </div>
        <div className="w-10 h-10 flex pt-1">
          <MdKeyboardArrowRight />
        </div>
      </Button>
    </div>
  );
}

export default function SideBar() {
  return (
    <div className="sidebar fixed top-0 left-0 z-100 h-full bg-gradient-to-br from-gray-200 to-gray-100 shadow-xl transform transition duration-500 hover:scale-105">
      <div className="flex justify-center items-center pt-6 pb-6">
        <img src={Logo} alt="Logo Image" className="w-16 h-16 transform transition duration-500 hover:rotate-12" />
        <div className="text-3xl font-bold pl-2 text-indigo-600 pt-3 animate-pulse">
          LIFTEN
        </div>
      </div>
      <div className="mt-8">
        <MenuItem title="Dashboard" icon={<MdOutlineDashboard />} link="home" />
        <MenuItem title="Products" icon={<MdProductionQuantityLimits />} link="manage" />
        <MenuItem title="Billing" icon={<MdProductionQuantityLimits />} link="bill" />
        <MenuItem title="Users" icon={<MdProductionQuantityLimits />} link="users" />
      </div>
    </div>
  );
}
