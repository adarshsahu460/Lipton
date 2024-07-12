import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export function AlertBox(type,msg){
    return <div>
        {type == 1 ? toast.success(`${msg}`) :  toast.warning(`${msg}`)}
    </div>
}