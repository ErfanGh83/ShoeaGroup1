import { useState } from "react";
import Onboarding from "./onboarding";
import SignUpForm from "../components/signUpForm"
import SignInForm from "../components/signInForm";
import ForgotPassForm from "../components/forgotPassForm";
import NewPassForm from "../components/newPassForm"


const Authentication = () => {

    const [page, setPage] = useState<string>("NewPassForm");

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
      {page === "Onboarding" && <Onboarding />}
      {page === "SignInForm" && <SignInForm setPage={setPage} />}
      {page === "SignUpForm" && <SignUpForm setPage={setPage} />}
      {page === "ForgotPassForm" && <ForgotPassForm setPage={setPage} />}
      {page === "NewPassForm" && <NewPassForm setPage={setPage} />}

    </div>
  );
};

export default Authentication;