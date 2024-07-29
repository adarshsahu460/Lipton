import { useEffect, useState } from "react";
import axios from "axios";
import { AlertBox } from "../../components/AlertBox.jsx";

export default function AdminList() {
  const [adminList, setAdminList] = useState([]);
  const URL = import.meta.env.VITE_PUBLIC_URL

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(URL+"/admin/getAllPendingAdmin", {
          withCredentials: true,
        });
        setAdminList(res.data);
      } catch (e) {
        // Handle error if needed
      }
    }
    getData();
  }, []);

  async function changeStatus(admin, approve) {
    try {
      const res = await axios.post(URL+"/admin/resolved", {
        id: admin.id,
        approve: approve,
      }, {
        withCredentials: true,
      });
      AlertBox(res.data.message === "Approved" ? 1 : 0, res.data.message);
    } catch (e) {
      // Handle error if needed
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Pending Admins</h1>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {adminList.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <p className="text-lg text-gray-500 font-semibold">No pending admins to review.</p>
          </div>
        ) : 
          adminList.map((ad, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col">
              <div className="flex items-start p-6 border-b border-gray-200 flex-grow">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {ad.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-1 flex items-center">
                    <span className="mr-2">👤</span> {ad.name}
                  </h2>
                  <p className="text-gray-600 mb-1 flex items-center">
                    <span className="mr-2">📧</span> {ad.email}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="mr-2">📞</span> {ad.mobile}
                  </p>
                </div>
              </div>
              <div className="flex justify-around p-4 bg-gray-100 border-t border-gray-200">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => changeStatus(ad, "0")}
                >
                  Reject
                </button>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  onClick={() => changeStatus(ad, "1")}
                >
                  Accept
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
