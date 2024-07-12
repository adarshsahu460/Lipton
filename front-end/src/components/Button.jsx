
export function Button({text, onClick}){
    return <div >
        <button onClick={onClick} className="bg-gray-950 text-white w-[100%] h-10 rounded-md p-2 "> {text} </button>
    </div>
}