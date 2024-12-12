import { useState } from "react";
import LoadingPage from "./pageLoading.page"
import WelcomePage from "./pageWelcom.page";
import Onboarding from "./onboarding.page";
import Authentication from "./authentication.page";
import Products from "./products.page";

const Shoea = () => {
  const [page, setPage] = useState(4);

  return (
    <>
      {page === 0 && <LoadingPage setPage={setPage} />}
      {page === 1 && <WelcomePage setPage={setPage} />}
      {page === 2 && <Onboarding />}
      {page === 3 && <Authentication />}
      {page === 4 && <Products />}
    </>
  );
};

export default Shoea;