import React, { useState, useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import unitService from '../../Manager/Service/unitService.js'
import { useService } from '../../Hooks/useService'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Messages } from 'primereact/messages'
import NewUnit from "./NewUnit";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ResponseStatus from "../../Manager/ResponseStatus";
import { Sidebar } from "primereact/sidebar";
import DetailUnit from "./DetailUnit.jsx";
function UnitList() {
  const [newSideVisible, setNewSideVisible] = useState(false);
  const [detailSideVisible, setDetailSideVisible] = useState(false);
  const [selectedTagRow, setSelectedTagRow] = useState(false);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState("center");
  const successMsg = useRef(null);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");

  const navigate = useNavigate();
  const test = (event) => {
    setDetailSideVisible(event);

    refetch();
  };
  const test1 = (event) => {
    setNewSideVisible(event);

    refetch();
  };
  const { data, isLoading, refetch } = useService("units", () =>
    unitService.fetchUnits()
  );

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  const addUnitCancel = (name) => {
    dialogFuncMap[`${name}`](false);
    setCode();
    setName();
  };
  const addUnitHandler = () => {
    const data = {
      abbreviation: abbreviation,
      name: name,
    };

    unitService.addUnit(data).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        setCode();
        setName();
        refetch();
        successMsg.current.show([
          {
            severity: "success",
            summary: "Başarılı",
            detail: name + " Eklendi",
            sticky: false,
          },
        ]);
      }
    });
  };
  const onRowClicked = (data) => {
    setSelectedTagRow(data);
    setDetailSideVisible(true);
  };
  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="İptal"
          icon="pi pi-times"
          onClick={() => addUnitCancel(name)}
          className="p-button-text"
        />
        <Button
          label="Kaydet"
          icon="pi pi-check"
          onClick={() => addUnitHandler()}
          autoFocus
        />
      </div>
    );
  };
  //Dialog end

  const saveUnit = () => {
    setNewSideVisible(true);
  };

  return (
    <div className="grid">
      <ConfirmDialog />
      <Sidebar
        visible={newSideVisible}
        position="right"
        style={{ width: "25em" }}
        onHide={() => setNewSideVisible(false)}
      >
        <h3>Yeni Birim</h3>
        <NewUnit setNewSideVisible={(event) => test1(event)} />
      </Sidebar>
      <Sidebar
        visible={detailSideVisible}
        position="right"
        style={{ width: "25em" }}
        onHide={() => setDetailSideVisible(false)}
      >
        <h3>{selectedTagRow.name}</h3>
        <DetailUnit
          code={selectedTagRow.code}
          setSideVisible={(event) => test(event)}
        />
      </Sidebar>

      <div className="col-12">
        <Messages ref={successMsg}></Messages>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <h5>Birimler</h5>
            <Button
              className="p-button-raised p-button-sm font-bold"
              onClick={() => saveUnit()}
              label="Ekle"
              icon="pi pi-plus font-bold"
            />

            <Dialog
              header="Birim Ekleme"
              visible={displayBasic}
              style={{ width: "25vw" }}
              footer={renderFooter("displayBasic")}
              onHide={() => addUnitCancel("displayBasic")}
            >
              <div className="flex flex-column justify-content-center align-items-center">
                Birim kısaltması
                <InputText
                  className="mt-1"
                  value={abbreviation}
                  onChange={(e) => setAbbreviation(e.target.value)}
                />
                Birim adı
                <InputText
                  className="mt-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </Dialog>
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
            onRowClick={(e) => onRowClicked(e.data)}
          >
            <Column field="abbreviation" header="Kısaltma"></Column>
            <Column field="name" header="Birim"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default UnitList
