import { useState } from "react";
import Quality from "../components/Onboarding/quality";
import SatisFaction from "../components/Onboarding/satisfaction";
import ShoeaRight from "../components/Onboarding/shoearight";
import Authentication from "./authentication.page";


const Onboarding = () => {
  const [page, setPage] = useState<number | string>("Qulity");

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
      {page === "Qulity" && <Quality setPage={setPage} />}
      {page === "SatisFaction" && <SatisFaction setPage={setPage} />}
      {page === "ShoeaRight" && <ShoeaRight setPage={setPage} />}
      {page === "Authentication" && <Authentication />}

    </div>
  );
};

export default Onboarding;