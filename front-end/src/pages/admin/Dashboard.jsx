import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHome from './AdminHome';
import ManageProducts from './ManageProducts.jsx';
import SideBar from "../../components/sidebar/index.jsx"
import {AdminHeader} from "../../components/AdminHeader.jsx"
import {Billing} from "./Billing.jsx"
import { Users } from './Users.jsx';

const Dashboard = () => {
  return (
    <>
      <div className='flex main'>
            <div className='w-[20%] sidebarWrapper'>
                <SideBar />
            </div>

            {/* Internal Routes for Dashboard page */}
            <div className='flex flex-col w-[85%]'>
              <div className='header'>
                    <AdminHeader />
              </div>
              <div className=' w-[100%] mt-3 p-3'>
                  <Routes>
                      <Route path="home" element={<AdminHome />} />
                      <Route path="manage" element={<ManageProducts />} />
                      <Route path="bill" element={<Billing />} />
                      <Route path="users" element={<Users />} />
                  </Routes>
              </div>
            </div>
      </div>
    </>
  );
};

export default Dashboard;
