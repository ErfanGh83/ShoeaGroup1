import { useState } from "react";

const Authentication = () => {

    const [page, setPage] = useState<string>("SignInForm");

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
      {/* {page === "Onboarding" && <Onboarding />} */}

    </div>
  );
};

export default Authentication;