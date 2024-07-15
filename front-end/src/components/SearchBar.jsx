
export function SearchBar({update}){
    return <div className=" m-2 ">
        <input type="text" className="border border-black mx-1 w-[85%] rounded-md p-1" onChange={update} />
        <button className="border border-black mx-1 w-[10%] rounded-md p-1 bg-blue-400" >Find</button>
    </div>
}