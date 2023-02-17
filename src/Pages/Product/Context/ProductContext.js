import React, { createContext, useState } from "react";

export const ProductContext = createContext();

function ProductContextProvider({ children }) {
  /*Product Section*/
  const [productFilesBinary, setProductFilesBinary] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variantItems, setVariantItems] = useState([]);
  const [classificationAttributeValues, setClassificationAttributeValues] =
    useState([]);

  /*Product Variants*/

  /*Not in Request */
  const [selectedVariantItemIndex, setSelectedVariantItemIndex] = useState([]);
  const [selectedVariantItem, setSelectedVariantItem] = useState({});
  const [selectedVariantItems, setSelectedVariantItems] = useState([]);

  return (
    <ProductContext.Provider
      value={{
        productFilesBinary,
        setProductFilesBinary,
        variants,
        setVariants,
        variantItems,
        setVariantItems,
        classificationAttributeValues,
        setClassificationAttributeValues,
        selectedVariantItemIndex,
        setSelectedVariantItemIndex,
        selectedVariantItem, 
        setSelectedVariantItem,
        selectedVariantItems,
        setSelectedVariantItems
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
