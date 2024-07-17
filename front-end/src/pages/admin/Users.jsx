import { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import axios from "axios";
import { printBill, PendingBill } from "./functions.jsx";
import { AlertBox } from "../../components/AlertBox.jsx";
import { InputBox } from "../../components/InputBox.jsx";

export function Users() {
  const [usersList, setUsersList] = useState([]);
  const [filter, setFilter] = useState("");
  const [pendingBill, setPendingBill] = useState("");

  async function fetchData() {
    const res = await axios.get(
      "http://localhost:3000/api/v1/admin/getPending?str=" + filter,{
        withCredentials: true,  
      }
    );
    setUsersList(res.data);
  }
  const clearBalance = async(userId,amt)=>{
    try{
        const response = await axios.post("http://localhost:3000/api/v1/admin/payNow",{
          userId,
          amt
        },{
            withCredentials: true,
        });
        AlertBox(1, response.data.message);
        fetchData()
    }catch(e){
        AlertBox(2, e.response.data.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, [filter]);
  return (
    <div className="flex h-[600px]">
      <div className="w-screen bg-white border border-gray-300 m-2 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-center font-bold text-2xl mb-6">
          Search for Users
        </div>
        <SearchBar
          update={(e) => {
            setFilter(e.target.value);
          }}
        />
        <div className="mt-6 max-h-[400px] overflow-y-auto">
          {usersList.length>0 && usersList.map((user, index) => (
            <div
              key={user.id}
              className="flex bg-green-50 items-center m-2 px-3 rounded-lg justify-between shadow-md hover:bg-green-100 transition duration-200"
            >
              <div className="font-semibold ">{index + 1}</div>
              <div className="flex-1 ml-4">{user.name}</div>
              <div className="flex-1 text-right font-semibold pr-3">${user.balance}</div>
              <InputBox label={"Enter Amount"} placeholder={""} type={"number"} onClick={(e)=> { setPendingBill(e.target.value) }} />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-green-600 transition duration-200"
                onClick={() => {
                    clearBalance(user.id,Number(pendingBill));
                }}
              >
              Paid
              </button> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
