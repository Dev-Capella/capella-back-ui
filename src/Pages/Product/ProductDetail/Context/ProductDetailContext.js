import React, { createContext, useState } from "react";

export const ProductDetailContext = createContext();

function ProductDetailContextProvider({ children }) {
  /*Product Section*/
  const [productForm,setProductForm] = useState({})
  const [productGalleries, setProductGalleries] = useState([]);
  const [productFiles, setProductFiles] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variantItems, setVariantItems] = useState([]);
  const [classificationAttributeValues, setClassificationAttributeValues] =
    useState([]);
    
  /*Product Variants*/
  const [selectedClassifications, setSelectedClassifications] =
  useState([]);
  /*Not in Request */
  const [selectedVariantItemIndex, setSelectedVariantItemIndex] = useState([]);
  const [selectedVariantItem, setSelectedVariantItem] = useState({});
  const [selectedVariantItems, setSelectedVariantItems] = useState([]);

  return (
    <ProductDetailContext.Provider
      value={{
        productForm,
        setProductForm,
        productGalleries, 
        setProductGalleries,
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
        setSelectedVariantItems,
        selectedClassifications, 
        setSelectedClassifications,
        productFiles,
         setProductFiles
      }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
}

export default ProductDetailContextProvider;
