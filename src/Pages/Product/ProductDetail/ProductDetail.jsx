import React from "react";
import ProductDetailContextProvider, { ProductDetailContext } from "./Context/ProductDetailContext";
import ProductDetailForm from "./Components/ProductDetailForm";
import ProductDetailVariants from "./Components/ProductDetailVariants";
import ProductDetailAttributeValue from "./Components/ProductDetailAttributeValue";


function ProductDetail() {
  

  return (
    <ProductDetailContextProvider>
    <div className="grid">
      <div className="col-12">
          <ProductDetailForm/> 
        <div className="mt-5">
           <ProductDetailVariants/> 
        </div>
        <div className="mt-5">
          <ProductDetailAttributeValue/> 
        </div>
      </div>
    </div>
  </ProductDetailContextProvider>
  );
}

export default ProductDetail;
