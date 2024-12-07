import { useState } from "react";
import LoadingPage from "./pageLoading"
import WelcomePage from "./pageWelcom";
import Onboarding from "./onboarding";
import Authentication from "./authentication";

const Shoea = () => {
  const [page, setPage] = useState(0);

  return (
    <>
      {page === 0 && <LoadingPage setPage={setPage} />}
      {page === 1 && <WelcomePage setPage={setPage} />}
      {page === 2 && <Onboarding />}
      {page === 3 && <Authentication />}
    </>
  );
};

export default Shoea;