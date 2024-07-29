import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaEnvelope, FaPhone, FaMoneyBillWave, FaDollarSign } from 'react-icons/fa';
import {ClipLoader} from "react-spinners";

const AdminHome = () => {
  const [adminData, setAdminData] = useState({});
  const [pendingAmt, setPendingAmt] = useState(0);
  const [profitAmt, setProfitAmt] = useState(0); // Uncomment this line once the API provides the profit data
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_PUBLIC_URL
  useEffect(() => {
    async function getData() {
      setLoading(true)
      const res = await axios.get(`${URL}/admin/getStats`, {
        withCredentials: true,
      });
      setAdminData(res.data.message.admin);
      setPendingAmt(res.data.message.pending);
      setProfitAmt(res.data.message.profit); 
      setLoading(false)
    }
    getData();
  }, []);

  return <>
    { loading ? <ClipLoader/> :
    <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
      
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        
        <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-400 flex items-center">
          <div className="relative flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg border-4 border-lightblue-400">
            <FaUserCircle className="text-6xl text-lightblue-600" />
          </div>
          <div className="ml-6">
            <h2 className="text-4xl font-bold">{adminData.name}</h2>
            <p className="text-lg mt-1">Admin</p>
          </div>
        </div>
        
        {/* Admin Details Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Email Card */}
          <div className="flex items-center bg-white p-4 rounded-lg shadow-md border border-gray-300">
            <div className="mr-4 text-blue-600">
              <FaEnvelope className="text-3xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-800">{adminData.email}</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="flex items-center bg-white p-4 rounded-lg shadow-md border border-gray-300">
            <div className="mr-4 text-gray-600">
              <FaPhone className="text-3xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-800">{adminData.mobile}</p>
            </div>
          </div>
        </div>

        {/* Pending and Profit Information Section */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Pending Amount Section */}
          <div className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-xl border border-gray-300">
            <div className="relative w-40 h-40 flex items-center justify-center mb-4">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FaMoneyBillWave className="text-4xl text-yellow-600" />
                </div>
              </div>
              <div className="absolute w-36 h-36 border-4 border-yellow-300 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Pending Amount</h2>
            <p className="text-2xl font-bold text-gray-900">${pendingAmt}</p>
          </div>

          {/* Profit Amount Section */}
          <div className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-xl border border-gray-300">
            <div className="relative w-40 h-40 flex items-center justify-center mb-4">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <FaDollarSign className="text-4xl text-green-600" />
                </div>
              </div>
              <div className="absolute w-36 h-36 border-4 border-green-300 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Profit Amount</h2>
            <p className="text-2xl font-bold text-gray-900">${profitAmt}</p>
          </div>

        </div>
      </div>
    </div>
  }
  </>
};

export default AdminHome;
