import axios from "axios";
import { useEffect, useState } from "react";

import AddProductPopup from "../../components/ProductPopUp";
import { AlertBox } from "../../components/AlertBox";
import { ScaleLoader } from "react-spinners";
export default function ManageProducts() {
    const [productList, setProductList] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);    
    const [isUpdate, setIsUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({
        id: 0,
        name: "",
        price: 0,
        key : ""
    });
    const URL = import.meta.env.VITE_PUBLIC_URL

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        fetchProducts()
        setIsPopupOpen(false);
        setIsUpdate(false);
    };

    const updateSelected = async (product) => {
        console.log(product);
        setSelectedProduct(product);
        setIsUpdate(true);
        openPopup();
    };
    
    async function removeItem(product){
        try{
            setLoading(true)
            const res = await axios.post(URL+"/admin/deleteItem", {
                id : product.id
            }, {
                withCredentials : true
            });

            if(res.status == 200){
                AlertBox(1, "Removed Successfully");
            }else{
                AlertBox(2, "Something Went Wrong");
            }
            setLoading(false)
            fetchProducts()
        }catch(error){
            console.error(error);
            setLoading(false)
        }
    }
    async function fetchProducts() {
        try {
            setLoading(true);
            const res = await axios.get(URL+"/admin/getItems?str=", {
                withCredentials: true,
            });
            setProductList(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product list:", error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="bg-blue-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Products List</h2>
                <button onClick={openPopup} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                    Add
                </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                { loading?  <div className="flex flex-row justify-center items-center h-max">  
                    <ScaleLoader/>
                </div> :
                 productList.map((product, index) => (
                    <div
                        key={product.id}
                        className="flex items-center justify-between p-3 mb-2 bg-green-50 rounded-lg shadow-md hover:bg-green-100 transition duration-200"
                    >
                        <div className="font-semibold">{index + 1}</div>
                        <div className="flex-1 ml-4">{product.name}</div>
                        <div className="flex-1 text-right font-semibold">${product.price.toFixed(2)}</div>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-green-600 transition duration-200"
                            onClick={() => updateSelected(product)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-red-600 transition duration-200"
                            onClick={() => removeItem(product)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <AddProductPopup isOpen={isPopupOpen} onClose={closePopup} product={selectedProduct} isUpdate={isUpdate} />
        </div>
    );
}
