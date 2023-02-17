import React, { useRef, useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import supplierService from "../../Manager/Service/supplierService";
import { useService } from "../../Hooks/useService";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import ResponseStatus from "../../Manager/ResponseStatus";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function SupplierList() {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState("center");
  const successMsg = useRef(null);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState();

  const navigate = useNavigate();

  const { data, isLoading, refetch } = useService("suppliers", () =>
    supplierService.fetchSuppliers()
  );

  return (
    <div className="grid">
      <ConfirmDialog />
      <div className="col-12">
        <Messages ref={successMsg}></Messages>
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <h5>Tedarikçiler</h5>
            <Button
              className="p-button-raised p-button-sm font-bold"
              label="Ekle"
              onClick={() => navigate("new")}
              icon="pi pi-plus font-bold"
            />
          </div>
          <DataTable
            value={data?.data}
            paginator
            rows={10}
            dataKey="id"
            filterDisplay="menu"
            loading={isLoading}
            responsiveLayout="scroll"
            emptyMessage="Kayıt bulunamadı"
            rowClassName={"cursor-pointer"}
            rowHover={true}
            onRowClick={(e) => navigate(e.data?.code)}
          >
            <Column field="employeeName" header="Tedarikçi"></Column>
            <Column field="telephone" header="Telefon"></Column>
            <Column field="email" header="E-mail"></Column>
            <Column field="company" header="Şirket"></Column>
            <Column field="taxNumber" header="Vergi Numarası"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default SupplierList;
