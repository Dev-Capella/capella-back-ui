import React, { useState } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";

export default function FileUpload({images,setImages,galleries,setGalleries,multiple=false}) {

  const [showButtonIndexImage, setShowButtonIndexImage] = useState(-1);
  const [showButtonIndexGallery, setShowButtonIndexGallery] = useState(-1);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = multiple ? e.dataTransfer.files:[e.dataTransfer.files[0]];
    console.log(droppedFiles)
    addProductFiles([...droppedFiles])
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
  
  const addProductFiles = async (files) => {
    const binary = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      binary.push(await toBase64(file));
    }
    var oldImages = multiple ? images:[];
    setImages([...oldImages,...binary]);
  };

  const handleClick = (e) => {
    setShowButtonIndexImage(-1);
    e.preventDefault();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".jpg, .jpeg, .png";
    fileInput.multiple = multiple;
    fileInput.onchange = (e) => {
      const selectedFiles = e.target.files;
      addProductFiles([...selectedFiles]);
    };
    fileInput.click();
  };

  const handleDragOver = (e) => {
    setShowButtonIndexImage(-1);
    e.preventDefault();
  };

  const handleDeleteImage = (index) => {
    setShowButtonIndexImage(-1);
    const newFiles = [...images];
    newFiles.splice(index, 1);
    setImages([...newFiles]);
  };

  const handleDeleteGallery = (index) => {
    setShowButtonIndexGallery(-1);
    const newFiles = [...galleries];
    newFiles.splice(index, 1);
    setGalleries([...newFiles]);
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
      <div className="flex flex-wrap">
      {galleries?.map((file, index) => {
            const fileUrl = file?.medias[0]?.absolutePath;
            return (
              <div
                className="relative w-10rem h-10rem border-3 border-transparent border-round hover:bg-primary-100 transition-duration-100 cursor-auto mb-2"
                style={{ padding: "1px" }}
                key={index}
                onMouseEnter={() => setShowButtonIndexGallery(index)}
                onMouseLeave={() => setShowButtonIndexGallery(-1)}
              >
                <Image
                  preview
                  key={index}
                  src={fileUrl}
                  alt="Image"
                  imageClassName="w-9rem h-9rem"
                />
                <Button
                  onClick={() => handleDeleteGallery(index)}
                  visible={showButtonIndexGallery === index}
                  icon="pi pi-times"
                  className="absolute top-0 right-0 p-button-rounded p-button-primary cursor-pointer"
                />
              </div>
            );
          })}

      {images?.map((file, index) => {
            const fileUrl = file.url;

            return (
              <div
                className="relative w-10rem h-10rem border-3 border-transparent border-round hover:bg-primary-100 transition-duration-100 cursor-auto mb-2"
                style={{ padding: "1px" }}
                key={index}
                onMouseEnter={() => setShowButtonIndexImage(index)}
                onMouseLeave={() => setShowButtonIndexImage(-1)}
              >
                <Image
                  preview
                  key={index}
                  src={fileUrl}
                  alt="Image"
                  imageClassName="w-9rem h-9rem"
                />
                <Button
                  onClick={() => handleDeleteImage(index)}
                  visible={showButtonIndexImage === index}
                  icon="pi pi-times"
                  className="absolute top-0 right-0 p-button-rounded p-button-primary cursor-pointer"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
