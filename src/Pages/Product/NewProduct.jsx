import React from "react";
import AttributeValue from "./Components/AttributeValue";
import ProductVariants from "./Components/ProductVariants";
import ProductContextProvider from "./Context/ProductContext";
import ProductForm from "./Components/ProductForm";
export default function NewProduct() {
  return (
    <ProductContextProvider>
      <div className="grid">
        <div className="col-12">
           <ProductForm/>
          <div className="mt-5">
            <ProductVariants/>
          </div>
          <div className="mt-5">
            <AttributeValue
            />
          </div>
        </div>
      </div>
    </ProductContextProvider>
  );
}
