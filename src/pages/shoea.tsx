import { useState } from "react";
import LoadingPage from "./pageLoading"
import WelcomePage from "./pageWelcom";
import Onboarding from "./onboarding";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./signin.page";
import ForgetPassPage from "./forget.pass.page";
import ResetPassPage from "./new.pass.page";
const Shoea = () => {
  const [page, setPage] = useState(0);

  return (
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<LoadingPage setPage={setPage}/>}></Route>
    <Route path="/welcomepage" element={<WelcomePage setPage={setPage}/>}></Route>
    <Route path="/onboarding" element={<Onboarding/>}></Route>
    <Route path="/login" element={<SignInPage/>}></Route>
    <Route path="/ForgotPassForm" element={<ForgetPassPage/>}></Route>
    <Route path="/resetPassForm" element={<ResetPassPage/>}></Route>
  </Routes>
    </BrowserRouter>
  );
};

export default Shoea;