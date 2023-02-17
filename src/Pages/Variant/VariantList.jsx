import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import variantService from "../../Manager/Service/variantService";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Chip } from 'primereact/chip';
import { useQuery } from "react-query";
import NewVariant from "./NewVariant";
import DetailVariant from "./DetailVariant";

function VariantList() {

  const navigate = useNavigate();

  const { data:variants,isFetching, isLoading,refetch } = useQuery("variants", () =>
      variantService.fetchVariants(), {
        refetchOnWindowFocus: true,
        staleTime: 0,
        cacheTime: 0,
        refetchInterval: 0,
      }
  );



  const [newSideVisible, setNewSideVisible] = useState(false);
  const [detailSideVisible, setDetailSideVisible] = useState(false);
  const [selectedVariantRow, setSelectedVariantRow] = useState(false);


  const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
          {rowData.variantValues.map((option) => {
              return (<Chip key={option.code} label={option.name} className="mr-2 mb-2" />)
          })}
        </React.Fragment>
    );
}


  const test = (event) =>{
    setDetailSideVisible(event);
    
    refetch();
  }

  const test1 = (event) =>{
    setNewSideVisible(event);
    
    refetch();
  }
  const savedVariant = () => {
    setNewSideVisible(true);
    
  }

  const onRowClicked = (data) => {
    setSelectedVariantRow(data);
    setDetailSideVisible(true);
  }

  return (
    <div className="grid">

      <Sidebar
        visible={newSideVisible}
        position="right"
        style={{ width: "25em" }}
        onHide={() => setNewSideVisible(false)}
      >
        <h3>Yeni Varyant</h3>
        <NewVariant setNewSideVisible={(event) => test1(event)} />
      </Sidebar>

      <Sidebar
        visible={detailSideVisible}
        position="right"
        style={{ width: "25em" }}
        onHide={() => setDetailSideVisible(false)}
      >
        <h3>{selectedVariantRow.name}</h3>
        <DetailVariant code={selectedVariantRow.code} setSideVisible={(event) => test(event)} />
      </Sidebar>

      <div className="col-12">
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <h5>Varyant Listesi</h5>
            <Button
              className="p-button-raised p-button-sm font-bold"
              onClick={() => savedVariant()}
              label="Ekle"
              icon="pi pi-plus font-bold"
            />
          </div>
          <DataTable
            value={variants}
            paginator
            rows={10}
            dataKey="code"
            key={"code"}
            filterDisplay="menu"
            loading={isFetching}
            responsiveLayout="scroll"
            emptyMessage="Kayıt bulunamadı"
            rowClassName={"cursor-pointer"}
            rowHover={true}
            onRowClick = {(e)=> onRowClicked(e.data)}
          >
            <Column field="name" header="Varyant"></Column>
            <Column header="Seçenekler" body={(row)=> actionBodyTemplate(row)}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default VariantList;
