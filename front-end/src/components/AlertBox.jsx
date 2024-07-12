import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export function AlertBox(type){
    return <div>
        {type == 1 ? toast.success("Done") :  toast.warning("Something Went Wrong")}
    </div>
}