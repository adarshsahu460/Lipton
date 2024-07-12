
export function InputBox({label, placeholder, type, onClick}){
    return <div className="my-3">
        <div className="text-black font-bold my-1">{label}</div>
        <input type={type} placeholder={placeholder} onChange={onClick} className="border border-neutral-300 py-2 px-3 rounded-md w-[100%] " />
    </div>
}