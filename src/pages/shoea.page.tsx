import LoadingPage from "./pageLoading.page"
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
import Layout from "../components/layout";
import OrdersPage from "./ordersPage";
import ProfilePage from "./profilePage";
import WalletPage from "./walletPage";
import CartPage from "./cartPage";

const Shoea = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingPage/>}/>
        <Route path="/welcomepage" element={<WelcomePage/>}/>
        <Route path="/onboarding" element={<Onboarding/>}/>
        <Route path="/login" element={<SignInPage/>}/>
        <Route path="/signUp" element={<SigneUpPage/>}/>
        <Route path="/ForgotPassForm" element={<ForgetPassPage/>}/>
        <Route path="/resetPassForm" element={<ResetPassPage/>}/>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<HomePage/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/orders" element={<OrdersPage/>}/>
          <Route path="/wallet" element={<WalletPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Route>
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/brand/:brand" element={<BrandPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Shoea;