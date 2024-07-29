import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AlertBox } from '../../components/AlertBox';
import { useNavigate } from 'react-router-dom';

const Console = () => {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate()
  const URL = import.meta.env.VITE_PUBLIC_URL
  useEffect(()=>{
    axios.get(URL+"/user/dashboard",{withCredentials:true}).then((res)=>{
      setUserDetails(res.data.message)
    }).catch(e=>{navigate("/user/signin")})
  },[]);
  async function logout(){
    await axios.get(URL+"/user/logout",{withCredentials:true})
    AlertBox(1,"Logged out successfully")
    navigate("/user/signin")
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-gray-50 p-8 rounded-lg shadow-lg relative">
        <button
          onClick={logout}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-4 mr-4 rounded-lg shadow"
        >
          Logout
        </button>
        <h2 className="text-2xl text-blue-600 mb-4">Hello {userDetails.name}</h2>
        <div className="mb-6">
          <div className="mb-2">Your balance: <span className="font-semibold">${userDetails.balance}</span></div>
          <div>Your mobile: <span className="font-semibold">{userDetails.mobile}</span></div>
        </div>
        {userDetails.orders && userDetails.orders.length > 0 && userDetails.orders.map((order) => (
          <div key={order.id} className="bg-white p-4 mb-4 rounded-lg shadow-md border-l-4 border-blue-600">
            <div className="border-b border-gray-200 mb-2 pb-2">Order Details</div>
            <div>Item Name: <span className="font-semibold">{order.item.name}</span></div>
            <div>Item Quantity: <span className="font-semibold">{order.quantity}</span></div>
            <div>Item Price: <span className="font-semibold">${order.item.price}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Console;
