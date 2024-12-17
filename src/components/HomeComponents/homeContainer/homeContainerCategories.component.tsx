import { SiNike } from "react-icons/si";
import { CgAdidas } from "react-icons/cg";
import { SiPuma } from "react-icons/si";
import { SiReebok } from "react-icons/si";
import { SiNewbalance } from "react-icons/si";
import { GiConverseShoe } from "react-icons/gi";
import { CgMore } from "react-icons/cg";
import { useNavigate } from "react-router";


const categories = [
    {title : 'Nike',
        src: SiNike
    },
    {title : 'Adidas',
        src: CgAdidas
    },
    {title : 'Puma',
        src: SiPuma
    },
    {title : 'Asics',
        src: SiNike
    },
    {
        title : 'Reebok',
        src : SiReebok
    },
    {
        title : 'New Balance',
        src : SiNewbalance
    },
    {
        title : 'Converse',
        src : GiConverseShoe
    },
    {
        title : 'More',
        src : CgMore
    },
]


const HomeContainerCategories = () => {

    const navigate = useNavigate();

    return(
        <div className="w-full h-[250px] my-4">
            <ul className="w-full h-full grid grid-cols-4 grid-rows-2">
                {categories.map((brand)=>
                    <li key={brand.title.toLowerCase()} className="w-[60px] h-[91px] m-auto" onClick={() => navigate(`/brand/${brand.title.toLowerCase()}`)}>
                        <div className="size-[60px] rounded-full bg-gray-200 flex items-center justify-evenly">
                            <brand.src className="w-8 h-8" />
                        </div>

                        <h2 className="text-center font-semibold mt-2">
                            {brand.title}
                        </h2>
                
                    </li>   
                )} 
            </ul>
        </div>
    )
}

export default HomeContainerCategories;