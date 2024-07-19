import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar } from "../../components/SearchBar";
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
        "http://localhost:3000/api/v1/admin/getItems?str=" + filter, {
          withCredentials: true,
        }
      );
      setProductList(res.data);
    }
    fetchData();
  }, [filter]);

  const addToCart = (product) => {
    const existingProductIndex = myProducts.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedProducts = [...myProducts];
      updatedProducts[existingProductIndex].qty += 1;
      setMyProducts(updatedProducts);
    } else {
      const newProduct = { ...product, qty: 1 };
      setMyProducts([...myProducts, newProduct]);
    }
    setTotalAmt(totalAmt + product.price);
  };

  const removeFromCart = (product) => {
    const productIndex = myProducts.findIndex((p) => p.id === product.id);

    if (productIndex !== -1) {
      const updatedProducts = [...myProducts];
      if (updatedProducts[productIndex].qty > 1) {
        updatedProducts[productIndex].qty -= 1;
      } else {
        updatedProducts.splice(productIndex, 1);
      }
      setMyProducts(updatedProducts);
      setTotalAmt(totalAmt - product.price);
    }
  };

  return (
    <div className="flex h-[600px] bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="w-3/5 bg-white border border-gray-200 m-2 p-6 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105">
        <div className="flex items-center justify-center font-bold text-3xl text-purple-700 mb-6 animate-pulse">
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
              className="flex bg-green-50 items-center m-2 p-3 rounded-lg justify-between shadow-md hover:bg-green-100 transition duration-300 transform hover:-translate-y-1"
            >
              <div className="font-semibold">{index + 1}</div>
              <div className="flex-1 ml-4">{product.name}</div>
              <div className="flex-1 text-right font-semibold">${product.price.toFixed(2)}</div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4 shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
                onClick={() => addToCart(product)}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/5 bg-white border border-gray-200 m-2 p-6 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center font-bold text-3xl text-purple-700 mb-6 animate-pulse">
            Your Products
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {myProducts.map((product, index) => (
              <div
                key={index}
                className="flex bg-green-50 items-center m-2 p-3 rounded-lg justify-between shadow-md hover:bg-green-100 transition duration-300 transform hover:-translate-y-1"
              >
                <div className="font-semibold">{index + 1}</div>
                <div className="flex-1 ml-4">{product.name}</div>
                <div className="flex-1 text-right font-semibold">${product.price.toFixed(2)}</div>
                <div className="flex items-center">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-105 ml-3"
                    onClick={() => removeFromCart(product)}
                  >
                    -
                  </button>
                  <div className="px-3">{product.qty}</div>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                </div>
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
                className="bg-green-600 text-white px-4 py-2 ml-4 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
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
              className="w-full p-[15px] rounded-lg border-[2px] border-gray-300 focus:border-purple-500 focus:outline-none transition duration-300 shadow-lg"
            />
            <button
              className="bg-green-500 text-white p-[15px] py-2 ml-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
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
