import React, { useContext, useState } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { ProductDetailContext } from "../Context/ProductDetailContext";
export default function ProductDetailImageSidebar() {
  const {
    selectedVariantItemIndex,
    variantItems,
    setVariantItems,
    selectedVariantItems
  } = useContext(ProductDetailContext);
  const galleries = variantItems[selectedVariantItemIndex]?.galleries;

  const filesBinary = variantItems[selectedVariantItemIndex]?.files;

  const [showButtonGalleryIndex, setShowButtonGalleryIndex] = useState(-1);

  const [showButtonFileIndex, setShowButtonFileIndex] = useState(-1);

  const setVariantItemsImages = (data) => {
    if (
      selectedVariantItems.length > 0 &&
      selectedVariantItems.filter((x) => x.index === selectedVariantItemIndex).length > 0
    ) {
      selectedVariantItems.forEach((product) => {
        variantItems[product.index].files = [...data];
      });
    } else {
      variantItems[selectedVariantItemIndex].files = [...data];
    }
    setVariantItems([...variantItems]);
  };

  const setVariantItemsGalleries = (data) => {
    if (
      selectedVariantItems.length > 0 &&
      selectedVariantItems.filter((x) => x.index === selectedVariantItemIndex).length > 0
    ) {
      selectedVariantItems.forEach((product) => {
        variantItems[product.index].galleries = [...data];
      });
    } else {
      variantItems[selectedVariantItemIndex].galleries = [...data];
    }
    setVariantItems([...variantItems]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    setVariantItemFile([...droppedFiles]);
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({
      file: reader.result.split(",")[1],
      url: reader.result,
      fileName: file.name,
      contentType: file.type,
      length: file.size
  });

    reader.onerror = error => reject(error);
  });
  
  const setVariantItemFile = async (files) => {
    const binary = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file)
      binary.push(await toBase64(file));
    }
    setVariantItemsImages([...filesBinary,...binary]);
  };

  const handleClick = (e) => {
    setShowButtonGalleryIndex(-1);
    setShowButtonFileIndex(-1);
    e.preventDefault();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".jpg, .jpeg, .png";
    fileInput.multiple = true;
    fileInput.onchange = (e) => {
      const selectedFiles = e.target.files;
      setVariantItemFile([...selectedFiles]);
    };
    fileInput.click();
  };

  const handleDragOver = (e) => {
    setShowButtonGalleryIndex(-1);
    setShowButtonFileIndex(-1);
    e.preventDefault();
  };

  const handleDeleteGalleries = (index) => {
    setShowButtonGalleryIndex(-1);
    const newFiles = [...galleries];
    newFiles.splice(index, 1);
    setVariantItemsGalleries([...newFiles]);
  };

  const handleDeleteFiles = (index) => {
    setShowButtonFileIndex(-1);
    const newFiles = [...filesBinary];
    newFiles.splice(index, 1);
    setVariantItemsImages([...newFiles]);
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
        className="flex align-items-center justify-content-center w-full h-9rem border-dotted border-indigo-100 hover:border-indigo-200  bg-indigo-50 mb-3"
      >
        <div className="flex flex-column ">
          <div className="flex justify-content-center text-indigo-500">
            <i className="pi pi-upload" style={{ fontSize: "2em" }}></i>
          </div>
          <div className="flex justify-content-center mt-2">
            <p>Medya yüklemek için tıklayın ya da bu alana sürükleyin</p>
          </div>
        </div>
      </div>
      {galleries?.map((file, index) => {
        // const fileUrl = URL.createObjectURL(file);
        const fileUrl = file.medias[0].absolutePath;
        return (
          <div className="flex flex-wrap gap-5" key={index}>
            <div
              className="relative w-full h-16rem border-3 border-transparent border-round hover:bg-primary-100 transition-duration-100 cursor-auto mb-2"
              style={{ padding: "1px" }}
              key={index}
              onMouseEnter={() => setShowButtonGalleryIndex(index)}
              onMouseLeave={() => setShowButtonGalleryIndex(-1)}
            >
              <Image
                preview
                key={index}
                src={fileUrl}
                alt="Image"
                imageClassName="w-full h-15rem"
              />
              <Button
                onClick={() => handleDeleteGalleries(index)}
                visible={showButtonGalleryIndex === index}
                icon="pi pi-times"
                className="absolute top-0 right-0 p-button-rounded p-button-primary cursor-pointer"
              />
            </div>
          </div>
        );
      })}

{filesBinary?.map((file, index) => {
        // const fileUrl = URL.createObjectURL(file);
        const fileUrl = file.url;
        return (
          <div className="flex flex-wrap gap-5" key={index}>
            <div
              className="relative w-full h-16rem border-3 border-transparent border-round hover:bg-primary-100 transition-duration-100 cursor-auto mb-2"
              style={{ padding: "1px" }}
              key={index}
              onMouseEnter={() => setShowButtonFileIndex(index)}
              onMouseLeave={() => setShowButtonFileIndex(-1)}
            >
              <Image
                preview
                key={index}
                src={fileUrl}
                alt="Image"
                imageClassName="w-full h-15rem"
              />
              <Button
                onClick={() => handleDeleteFiles(index)}
                visible={showButtonFileIndex === index}
                icon="pi pi-times"
                className="absolute top-0 right-0 p-button-rounded p-button-primary cursor-pointer"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
