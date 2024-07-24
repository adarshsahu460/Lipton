import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertBox } from "./AlertBox";

const AddProductPopup = ({ isOpen, onClose, product, isUpdate }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [key, setKey] = useState("");

//   console.log(productName);
    useEffect(() => {
        if(isUpdate){
            setProductName(product.name);
            setProductPrice(product.price);
            setKey(product.key);
        }else{
            setProductName("");
            setProductPrice("");
            setKey("");
        }
    }, [product, isUpdate])

  const handleAddProduct = async () => {
    // console.log("Adding product:", productName, productPrice);

    const res = await axios.post("http://localhost:3000/api/v1/admin/addItem", {
        name : productName,
        price : productPrice,
        key : key,
    }, {
        withCredentials : true
    });

    if(res.status == 200){
        AlertBox(1, "Added Successfully");
    }else{
        AlertBox(2, "Something Went Wrong");
    }
    
    setProductName("");
    setProductPrice("");
    setKey("");
    onClose();
  };

  const handleUpdateProduct = async () => {
    // console.log("Updating product:", productName, productPrice);
    const res = await axios.put("http://localhost:3000/api/v1/admin/updateItem", {
        name : productName,
        price : productPrice,
        key : key,
        id : product.id
    }, {
        withCredentials : true
    });

    if(res.status == 200){
        AlertBox(1, "Updated Successfully");
    }else{
        AlertBox(2, "Something Went Wrong");
    }

    setProductName("");
    setProductPrice("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <div className="mb-4">
              <label htmlFor="productName" className="block font-medium">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="productPrice" className="block font-medium">
                Product Price 
              </label>
              <input
                type="number"
                id="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="productPrice" className="block font-medium">
                Key 
              </label>
              <input
                type="text"
                id=""
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick= {isUpdate ? handleUpdateProduct :  handleAddProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 mr-2"
              >
                {isUpdate ? "Update Product" : "Add Product"}
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductPopup;
