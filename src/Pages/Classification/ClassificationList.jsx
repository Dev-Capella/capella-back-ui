import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import classificationService from "../../Manager/Service/classificationService";
import { useService } from "../../Hooks/useService";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import NewClassification from "./NewClassification";
import { Chip } from 'primereact/chip';
import { useQuery } from "react-query";
import DetailClassification from "./DetailClassification";
function ClassificationList() {
  const [newSideVisible, setNewSideVisible] = useState(false);
  const [detailSideVisible, setDetailSideVisible] = useState(false);
  const [selectedTagRow, setSelectedTagRow] = useState(false);
  const navigate = useNavigate();
  const {
    data: classifications,
    isFetching,
    refetch,
  } = useQuery("classifications", () =>
    classificationService.fetchClassifications()
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.options.map((option) => {
          return <Chip label={option.name} className="mr-2 mb-2" />;
        })}
      </React.Fragment>
    );
  };

  const addedClassification = (event) => {
    setNewSideVisible(event);
    refetch();
  };
  const test = (event) => {
    setDetailSideVisible(event);

    refetch();
  };
  const onRowClicked = (data) => {
    setSelectedTagRow(data);
    setDetailSideVisible(true);
  };

  return (
    <div className="grid">
      <Sidebar
        visible={newSideVisible}
        position="right"
        style={{ width: "25em" }}
        onHide={() => setNewSideVisible(false)}
      >
        <h3>Yeni Sınıflandırma</h3>
        <NewClassification
          setNewSideVisible={(event) => addedClassification(event)}
        />
      </Sidebar>
      <Sidebar
        visible={detailSideVisible}
        position="right"
        style={{ width: "25em" }}
        onHide={() => setDetailSideVisible(false)}
      >
        <h3>{selectedTagRow.name}</h3>
        <DetailClassification
          code={selectedTagRow.code}
          setSideVisible={(event) => test(event)}
        />
      </Sidebar>
      <div className="col-12">
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <h5>Sınıflandırma Verileri</h5>
            <Button
              className="p-button-raised p-button-sm font-bold"
              onClick={() => setNewSideVisible(true)}
              label="Ekle"
              icon="pi pi-plus font-bold"
            />
          </div>
          <DataTable
            value={classifications}
            paginator
            rows={10}
            dataKey="name"
            filterDisplay="menu"
            loading={isFetching}
            responsiveLayout="scroll"
            emptyMessage="Kayıt bulunamadı"
            rowClassName={"cursor-pointer"}
            rowHover={true}
            onRowClick={(e) => onRowClicked(e.data)}
          >
            <Column field="name" header="Sınıflandırma Verisi"></Column>
            <Column field="dataType" header="Veri Tipi"></Column>
            <Column
              header="Seçenekler"
              body={(row) => actionBodyTemplate(row)}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default ClassificationList;
