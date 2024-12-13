import { useState } from "react";
import Quality from "../components/Onboarding/quality";
import SatisFaction from "../components/Onboarding/satisfaction";
import ShoeaRight from "../components/Onboarding/shoearight";
import { Link } from "react-router-dom";
const Onboarding = () => {
const [pageIndex, setPageIndex] = useState<number>(0);
const pages = ["Quality", "SatisFaction", "ShoeaRight"];
const PageComponent = {
Quality: Quality,
SatisFaction: SatisFaction,
ShoeaRight: ShoeaRight,
}[pages[pageIndex]];

const handleNext = () => {
if (pageIndex < pages.length - 1) {
setPageIndex(pageIndex + 1);
}
};

return (
<div className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
{PageComponent && <PageComponent/>}
{pageIndex < pages.length - 1 && (
<button
onClick={handleNext}
className="bg-slate-900 rounded-full text-white w-[90%] py-3 mx-auto"
>
Next
</button>
)}
{pageIndex===2 &&(<Link to="/login"
className="bg-slate-900 rounded-full text-white w-[90%] py-3 mx-auto"
>
Get Start
</Link>)}
</div>
);
};

export default Onboarding;