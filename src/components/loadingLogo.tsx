import { FaCircleNotch } from "react-icons/fa"

export default function Loading (){
return(
    <div>
        <FaCircleNotch size={36} className={"animate-spin absolute bottom-[5%]"} />
    </div>
)    
}