import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHome from './AdminHome';
import SideBar from "../../components/sidebar/index.jsx"

const Dashboard = () => {
  return (
    <>
      <div className='flex main'>
            <div className='w-[20%] sidebarWrapper'>
                <SideBar />
            </div>

            {/* Internal Routes for Dashboard page */}
            <section className=' w-[85%]'>
                <Routes>
                    <Route path="home" element={<AdminHome />} />
                    <Route path="manage" element={<div>Manage</div>} />
                    <Route path="bill" element={<div>bill</div>} />
                </Routes>
            </section>
      </div>
    </>
  );
};

export default Dashboard;
