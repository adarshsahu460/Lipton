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
        <div className="flex border-b-2 py-2  justify-between px-4 bg-white shadow-sm">
            <div className="flex items-center justify-center font-bold text-2xl text-gray-800">
                Analytics
            </div>
            <div className="flex items-center">
                <div 
                    className="m-1 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 ease-in-out cursor-pointer" 
                    onClick={handleLogout}
                >
                    Logout 
                </div>
                <div className="bg-gray-600 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center ml-2">
                    H
                </div>
            </div>
        </div>
    );
}
