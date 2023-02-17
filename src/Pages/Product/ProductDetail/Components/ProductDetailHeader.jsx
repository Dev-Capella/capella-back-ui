import React, { useContext,useEffect } from "react";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { ProductDetailContext } from "../Context/ProductDetailContext";
import productService from "../../../../Manager/Service/productService";
import ResponseStatus from "../../../../Manager/ResponseStatus";
export default function ProductDetailHeader({ handleSubmit,submit }) {

  const {setProductForm,setVariants,setVariantItems,setClassificationAttributeValues,setSelectedClassifications,setProductGalleries} =  useContext(ProductDetailContext);
  const {code} = useParams();

  useEffect(()=>{
    productService.getProduct(code).then(result=>{
      if (result.status === ResponseStatus.SUCCESS) {
        var product={
          id:result.data.id,
          code: result.data.code,
          name: result.data.name,
          active:result.data.active,
          deleted:result.data.deleted,
          description:result.data.description,
          price:result.data.price,
          discountedPrice:result.data.discountedPrice,
          brand:result.data.brand,
          tags:result.data.tags,
          supplier:result.data.supplier,
          categories:result.data.categories
        }
        setProductForm(product)
        setVariants(result.data.variants)
        setVariantItems(result.data.variantItems.map((x,index)=>{return {...x,index:index,files:[]}}))
        setClassificationAttributeValues(result.data.classificationAttributeValues)
        setSelectedClassifications(result.data.classifications)
        setSelectedClassifications(result.data.classifications)
        setProductGalleries(result.data.galleries)
      }
    })
  },[])

  const navigate = useNavigate();
  return (
    <div className="card shadow-1">
      <div className="flex justify-content-between mb-2 align-items-center">
        <span className="text-3xl font-bold">Ürün Ekle</span>
        <span className="p-buttonset">
          <Button
            className="p-button-sm font-bold"
            label="Save"
            icon="pi pi-check"
            onClick={handleSubmit((data) => submit(data))}
          />
          <Button
            className="p-button-sm font-bold"
            label="Cancel"
            icon="pi pi-times"
            onClick={() => navigate(-1)}
          />
        </span>
      </div>
    </div>
  );
}
