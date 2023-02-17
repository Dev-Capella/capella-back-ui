import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import brandService from "../../Manager/Service/brandService";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useQuery } from "react-query";
import NewBrand from "./NewBrand";
import { Messages } from "primereact/messages";
import { useNavigate } from "react-router-dom";
import DetailBrand from "./DetailBrand";

function BrandList() {
  const navigate = useNavigate();
  const successMsg = useRef(null);
  const {
    data: brands,
    isFetching,
    isLoading,
    refetch,
  } = useQuery("brands", () => brandService.fetchBrands(), {
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 0,
    refetchInterval: 0,
  });

  const [newSideVisible, setNewSideVisible] = useState(false);
  const [detailSideVisible, setDetailSideVisible] = useState(false);
  const [selectedTagRow, setSelectedTagRow] = useState(false);
  const [succesAdded, setSuccessAdded] = useState(false);

  const onRowClicked = (data) => {
    setSelectedTagRow(data);
    setDetailSideVisible(true);
  };
  const test = (event) => {
    setDetailSideVisible(event);

    refetch();
  };

  const test1 = (event) => {
    setNewSideVisible(event);

    refetch();
  };
  const saveBrand = () => {
    setNewSideVisible(true);
  };

  return (
    <div className="grid">
      <Messages className="w-full" ref={successMsg}></Messages>
      <Sidebar
        visible={newSideVisible}
        position="right"
        style={{ width: "25em" }}
        onHide={() => setNewSideVisible(false)}
      >
        <h3>Yeni Marka</h3>
        <NewBrand
          setSuccessAdded={setSuccessAdded}
          setNewSideVisible={(event) => test1(event)}
        />
      </Sidebar>
      <Sidebar
        visible={detailSideVisible}
        position="right"
        style={{ width: "25em" }}
        onHide={() => setDetailSideVisible(false)}
      >
        <h3>{selectedTagRow.name}</h3>
        <DetailBrand
          setSuccessAdded={setSuccessAdded}
          code={selectedTagRow.code}
          setSideVisible={(event) => test(event)}
        />
      </Sidebar>

      <div className="col-12">
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <h5>Marka Listesi</h5>
            <Button
              className="p-button-raised p-button-sm font-bold"
              onClick={() => saveBrand()}
              label="Ekle"
              icon="pi pi-plus font-bold"
            />
          </div>
          <DataTable
            value={brands}
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
            onRowClick={(e) => onRowClicked(e.data)}
          >
            <Column field="name" header="Marka"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default BrandList;
