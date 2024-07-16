import { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import axios from "axios";
import { printBill, PendingBill } from "./functions.jsx";

export function Billing() {
  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState("");
  const [myProducts, setMyProducts] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "http://localhost:3000/api/v1/admin/getItems?str=" + filter
      );
      setProductList(res.data);
    }
    fetchData();
  }, [filter]);

  return (
    <div className="flex h-[600px]">
      <div className="w-3/5 bg-white border border-gray-300 m-2 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-center font-bold text-2xl mb-6">
          Select Products
        </div>
        <SearchBar
          update={(e) => {
            setFilter(e.target.value);
          }}
        />
        <div className="mt-6 max-h-[400px] overflow-y-auto">
          {productList.map((product, index) => (
            <div
              key={product.id}
              className="flex bg-green-50 items-center m-2 p-3 rounded-lg justify-between shadow-md hover:bg-green-100 transition duration-200"
            >
              <div className="font-semibold">{index + 1}</div>
              <div className="flex-1 ml-4">{product.name}</div>
              <div className="flex-1 text-right font-semibold">${product.price.toFixed(2)}</div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-green-600 transition duration-200"
                onClick={() => {
                  product["qty"] = 1;
                  const newList = myProducts.concat(product);
                  setMyProducts(newList);
                  setTotalAmt(totalAmt + product.price);
                }}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/5 bg-white border border-gray-300 m-2 p-6 rounded-lg shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center font-bold text-2xl mb-6">
            Your Products
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {myProducts.map((product, index) => (
              <div
                key={index}
                className="flex bg-green-50 items-center m-2 p-3 rounded-lg justify-between shadow-md hover:bg-green-100 transition duration-200"
              >
                <div className="font-semibold">{index + 1}</div>
                <div className="flex-1 ml-4">{product.name}</div>
                <div className="flex-1 text-right font-semibold">${product.price.toFixed(2)}</div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-red-600 transition duration-200"
                  onClick={() => {
                    setTotalAmt(totalAmt - product.price);
                    const newItems = myProducts.filter((p) => p.id !== product.id);
                    setMyProducts(newItems);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <div className="flex bg-gray-200 justify-between px-6 py-3 rounded-lg shadow-md mb-4">
            <div className="flex justify-between items-center w-full">
              <div className="text-lg">Total Amount</div>
              <div className="text-lg font-semibold">${totalAmt.toFixed(2)}</div>
            </div>
            <div>
              <button
                className="bg-green-600 text-white px-4 py-2 ml-4 rounded-lg hover:bg-green-700 transition duration-200"
                onClick={() => {
                  printBill(myProducts, totalAmt);
                }}
              >
                Print
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <input
              onChange={(e) => setMobile(e.target.value)}
              type="text"
              placeholder="Customer's Mobile No."
              className="w-full p-[15px] rounded-lg border-[2px]  border-gray-300  duration-200"
            />
            <button
              className="bg-green-500 text-white p-[15px] py-2 ml-4 rounded-lg hover:bg-green-600 transition duration-200"
              onClick={() => {
                PendingBill(mobile, myProducts, totalAmt);
              }}
            >
              Pending
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
