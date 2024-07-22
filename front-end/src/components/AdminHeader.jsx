import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertBox } from './AlertBox';

export function AdminHeader() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/admin/logout", {
                withCredentials: true
            });

            if (res.status === 200) {
                AlertBox(1, "Signed Out");
                navigate("/admin/signin");
            } else {
                AlertBox(2, "Something went wrong");
            }
        } catch (error) {
            AlertBox(2, "Something went wrong");
        }
    }

    return (
        <div className="flex border-b-2 py-4 px-6 justify-between bg-white shadow-md transition-transform duration-300 ease-in-out hover:scale-102">
            <div className="flex items-center justify-center font-bold text-3xl text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600 animate-gradient-xy transition-transform duration-300 ease-in-out hover:scale-105">
                Analytics
            </div>
            <div className="flex items-center space-x-4">
                <div 
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer transform hover:scale-105"
                    onClick={handleLogout}
                >
                    Logout
                </div>
                <div className="bg-gray-800 text-white font-bold p-2 rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
                    H
                </div>
            </div>
        </div>
    );
}
