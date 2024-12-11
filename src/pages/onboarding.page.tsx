import { useState } from "react";
import Quality from "../components/Onboarding/quality";
import SatisFaction from "../components/Onboarding/satisfaction";
import ShoeaRight from "../components/Onboarding/shoearight";
import Authentication from "./authentication.page";

const Onboarding = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const pages = ["Quality", "SatisFaction", "ShoeaRight", "Authentication"];
  const PageComponent = {
    Quality: Quality,
    SatisFaction: SatisFaction,
    ShoeaRight: ShoeaRight,
    Authentication: Authentication,
  }[pages[pageIndex]];

  const handleNext = () => {
    if (pageIndex < pages.length - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      {PageComponent && <PageComponent setPage={setPageIndex} />}
      {pageIndex < pages.length - 1 && ( 
        <button
          onClick={handleNext}
          className="bg-slate-900 rounded-full text-white w-[90%] py-3 mx-auto"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Onboarding;
