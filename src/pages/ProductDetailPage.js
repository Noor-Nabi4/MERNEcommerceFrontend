import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ProdctDetails from "../features/product-list/components/ProdctDetails";

const ProdctDetailsPage = () => {
  return (
    <div>
      <Navbar>
        <ProdctDetails/>
      </Navbar>
    </div>
  );
};

export default ProdctDetailsPage;
