import { useState } from "react";
import ShoeaRight from "../components/Onboarding/shoearight"
import SignUpForm from "../components/signUpForm"


const Authentication = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
      {page === 0 && <ShoeaRight setPage={setPage} />}
      {page === 1 && <SignUpForm setPage={setPage} />}

    </div>
  );
};

export default Authentication;