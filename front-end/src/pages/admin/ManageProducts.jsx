import axios from "axios";
import { useEffect, useState } from "react";

import AddProductPopup from "../../components/ProductPopUp";
import { AlertBox } from "../../components/AlertBox";

export default function ManageProducts() {
    const [productList, setProductList] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);    
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({
        id: 0,
        name: "",
        price: 0
    });

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setIsUpdate(false);
    };

    const updateSelected = async (product) => {
        await setSelectedProduct(product);
        setSelectedProduct((prevProduct) => {
            return product;
        });
        setIsUpdate(true);
        openPopup();
    };
    
    async function removeItem(product){
        try{
            console.log(product.id)
            const res = await axios.post("http://localhost:3000/api/v1/admin/deleteItem", {
                id : product.id
            }, {
                withCredentials : true
            });

            if(res.status == 200){
                AlertBox(1, "Removed Successfully");
            }else{
                AlertBox(2, "Something Went Wrong");
            }
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/admin/getItems?str=", {
                    withCredentials: true,
                });
                setProductList(res.data);
            } catch (error) {
                console.error("Error fetching product list:", error);
            }
        }
        fetchData();
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
                {productList.map((product, index) => (
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
