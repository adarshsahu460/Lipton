import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import ManageProducts from './ManageProducts.jsx';
import SideBar from "../../components/sidebar/index.jsx"
import {AdminHeader} from "../../components/AdminHeader.jsx"
import {Billing} from "./Billing.jsx"
import { Users } from './Users.jsx';
import axios from 'axios';
import { Images } from './Images.jsx';
import AdminList from './AdminList.jsx';

const Dashboard = () => {
  const navigate = useNavigate()
  const URL = import.meta.env.VITE_PUBLIC_URL

  useEffect(()=>{
    axios.get(URL+"/admin/dashboard",{withCredentials:true}).catch(e=>{navigate("/admin/signin")})
  },[]);
  return (
    <>
      <div className='flex main'>
            <div className='w-[20%] sidebarWrapper'>
                <SideBar />
            </div>
            <div className='flex flex-col w-[85%]'>
              <div className='header'>
                    <AdminHeader />
              </div>
              <div className=' w-[100%] mt-3 p-3'>
                  <Routes>
                      <Route path="/" element={<AdminHome />} />
                      <Route path="manage" element={<ManageProducts />} />
                      <Route path="bill" element={<Billing />} />
                      <Route path="users" element={<Users />} />
                      <Route path="/gallery" element={<Images />} />
                      <Route path="/verify" element={<AdminList />} />
                  </Routes>
              </div>
            </div>
      </div>
    </>
  );
};

export default Dashboard;
