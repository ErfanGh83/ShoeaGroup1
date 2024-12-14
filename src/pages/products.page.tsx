import { useState } from "react";
import Home from "../components/Home.component";

const Products = () => {

    const [page, setPage] = useState<string>("Home");

  return (
    <div className="relative w-full min-h-screen flex flex-col pt-24">
      {page === "Home" && <Home />}

    </div>
  );
};

export default Products;