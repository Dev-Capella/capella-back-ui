import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function ProductHeader({ handleSubmit,submit }) {
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
