import { useState } from "react";
import Onboarding from "./onboarding";
import SignUpForm from "../components/signUpForm"
import SignInForm from "../components/signInForm";


const Authentication = () => {

    const [page, setPage] = useState(1);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
      {page === 0 && <Onboarding />}
      {page === 1 && <SignInForm setPage={setPage} />}
      {page === 2 && <SignUpForm setPage={setPage} />}

    </div>
  );
};

export default Authentication;