import { useState } from "react";
import Onboarding from "./onboarding.page";
import SignUpForm from "../components/signUpForm.component"
import SignInForm from "../components/signInForm.component";
import ForgotPassForm from "../components/forgotPassForm.component";


const Authentication = () => {

    const [page, setPage] = useState<string>("SignInForm");

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {page === "Onboarding" && <Onboarding />}
      {page === "SignInForm" && <SignInForm setPage={setPage} />}
      {page === "SignUpForm" && <SignUpForm setPage={setPage} />}
      {page === "ForgotPassForm" && <ForgotPassForm setPage={setPage} />}

    </div>
  );
};

export default Authentication;