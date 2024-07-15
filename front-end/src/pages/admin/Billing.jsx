import {useEffect, useState} from "react"
import { SearchBar } from "../../components/SearchBar"
import axios from "axios"
import {printBill} from "./functions"

export function Billing(){

    const [productList, setProductList] = useState([])
    const [filter, setFilter] = useState("")
    const [myProducts, setMyProducts] = useState([])
    const [totalAmt, setTotalAmt] = useState(0)
    
    useEffect( ()=>{
        async function fetchData() {
            const res = await axios.get("http://localhost:3000/api/v1/admin/getItems?str="+filter);
            setProductList(res.data);
        }
        fetchData();
    }, [filter])

    return <div className="flex h-[600px]">
        <div className="w-[60%] border-black border m-1">
            <div className="flex items-center justify-center font-bold text-lg"> Select Products</div>
            <SearchBar update={(e)=>{
                // console.log(e.target.value)
                console.log(e.target.value)
                setFilter(e.target.value)
            }} />
            <div className="">
                {
                    productList.map((product, index)=>{
                        return <div key={product.id} className="flex bg-green-400 items-center m-1 p-1 justify-evenly" >
                             <div>{index+1} </div>
                             <div>{product.name} </div>
                             <div>{product.price }</div>
                             <button className="bg-blue-500 px-3 py-2 rounded-md" onClick={
                                () =>{
                                    const newList = myProducts.concat(product);
                                    setMyProducts(newList);
                                    setTotalAmt(totalAmt+product.price)
                                }
                             } > Add </button>
                        </div>
                    })
                }
            </div>
        </div>
        <div className="w-[40%] border-black border m-1">
            <div className="flex shadow-sm items-center justify-center font-bold text-lg"> Your Products</div>
            <div>
            {
                    myProducts.map((product, index)=>{
                        return <div key={index} className="flex bg-yellow-300 items-center m-1 p-1 justify-evenly" >
                             <div>{index+1} </div>
                             <div>{product.name} </div>
                             <div>{product.price }</div>
                             <button className="bg-blue-500 px-3 py-2 rounded-md" onClick={
                                () =>{
                                    setTotalAmt(totalAmt-product.price)
                                    const newItems = myProducts.filter((p)=>{
                                        if(p.id == product.id){
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    });

                                    setMyProducts(newItems);
                                }
                             } > Remove </button>
                        </div>
                    })
                }
            </div>
            
            <div className="flex bg-orange-500 justify-between px-4 py-1">
                <div className="flex  justify-between items-center w-[70%]">
                    <div>Total Amount</div>
                    <div>{
                            totalAmt
                        }
                    </div>
                </div>
                <div>
                    <button className="bg-blue-600 p-2 rounded-md" onClick={() => {
                        printBill(myProducts, totalAmt)
                    }} >Print</button>
                </div>
            </div>
        </div>
    </div>
}