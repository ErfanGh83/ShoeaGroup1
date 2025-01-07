import LoadingPage from "./pageLoading.page";
import WelcomePage from "./pageWelcom.page";
import Onboarding from "./onboarding.page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./signin.page";
import ForgetPassPage from "./forget.pass.page";
import ResetPassPage from "./new.pass.page";
import SigneUpPage from "./signeup.page";
import HomePage from "./homePage.page";
import ProductPage from "./productPage.page";
import BrandPage from "./brandPage.page";
import WishListPage from "./wishListPage.page";
import CartPage from "./CartPage";

const Shoea = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingPage />}></Route>
        <Route path="/welcomepage" element={<WelcomePage />}></Route>
        <Route path="/onboarding" element={<Onboarding />}></Route>
        <Route path="/login" element={<SignInPage />}></Route>
        <Route path="/signUp" element={<SigneUpPage />}></Route>
        <Route path="/ForgotPassForm" element={<ForgetPassPage />}></Route>
        <Route path="/resetPassForm" element={<ResetPassPage />}></Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/brand/:brand" element={<BrandPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Shoea;
