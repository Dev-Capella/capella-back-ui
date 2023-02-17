import React, { useState, useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import roleService from '../../Manager/Service/roleService'
import { useService } from '../../Hooks/useService'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Messages } from 'primereact/messages'
import NewUnit from './NewRole'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import ResponseStatus from '../../Manager/ResponseStatus'
import { Sidebar } from 'primereact/sidebar'
import DetailUnit from './DetailRoles.jsx'
import permissionService from '../../Manager/Service/permissionService'
import Loading from '../../Components/Loading/Loading'
import { useSelector, useDispatch } from 'react-redux'
import loadingReducer from '../../Manager/Reducers/loadingReducer'

function RoleList() {
  const switchStatus = useSelector((state) => state.loading.isActive)
  const dispatch = useDispatch()

  const [newSideVisible, setNewSideVisible] = useState(false)
  const [detailSideVisible, setDetailSideVisible] = useState(false)
  const [selectedTagRow, setSelectedTagRow] = useState(false)
  const [displayBasic, setDisplayBasic] = useState(false)
  const [position, setPosition] = useState('center')
  const [permissionAll, setPermissionAll] = useState(null)
  const successMsg = useRef(null)
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [abbreviation, setAbbreviation] = useState("");
  const test = (event) => {
    setDetailSideVisible(event);
    refetch();
  };
  const test1 = (event) => {
    setNewSideVisible(event);
    refetch();
  };

  const { data, isLoading, refetch } = useService("roles", () =>
    roleService.fetchRole()
  );

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };
  useEffect(() => {
    permissionService.fetchPermission().then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        setPermissionAll(result.data);
      }
    });
    dispatch(loadingReducer.actions.setLoading(true));
  }, []);
  const addRoleCancel = (name) => {
    dialogFuncMap[`${name}`](false);
    setCode();
    setName();
  };
  const addRoleHandler = () => {
    const data = {
      abbreviation: abbreviation,
      name: name,
    };

    roleService.addRole(data).then((result) => {
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
          onClick={() => addRoleCancel(name)}
          className="p-button-text"
        />
        <Button
          label="Kaydet"
          icon="pi pi-check"
          onClick={() => addRoleHandler()}
          autoFocus
        />
      </div>
    );
  };
  //Dialog end

  const saveRole = () => {
    setNewSideVisible(true);
  };
  if (!isLoading) {
    dispatch(loadingReducer.actions.setLoading(false));
  }

  return (
    <div className="grid">
      <ConfirmDialog />
      <Sidebar
        visible={newSideVisible}
        position="right"
        style={{ width: "25em" }}
        onHide={() => setNewSideVisible(false)}
      >
        <h3>Yeni Role</h3>
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
          permissionAll={permissionAll}
        />
      </Sidebar>

      <div className="col-12">
        <Messages ref={successMsg}></Messages>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <h5>Roller</h5>
            <Button
              className="p-button-raised p-button-sm font-bold"
              onClick={() => saveRole()}
              label="Ekle"
              icon="pi pi-plus font-bold"
            />

            <Dialog
              header="Role Ekleme"
              visible={displayBasic}
              style={{ width: "25vw" }}
              footer={renderFooter("displayBasic")}
              onHide={() => addRoleCancel("displayBasic")}
            >
              <div className="flex flex-column justify-content-center align-items-center">
                Role adı
                <InputText
                  className="mt-1"
                  value={abbreviation}
                  onChange={(e) => setAbbreviation(e.target.value)}
                />
                Role durumu
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
            responsiveLayout="scroll"
            emptyMessage="Kayıt bulunamadı"
            rowClassName={"cursor-pointer"}
            rowHover={true}
            onRowClick={(e) => onRowClicked(e.data)}
          >
            <Column field="name" header="Rol"></Column>
            <Column field="isActive" header="Durumu"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default RoleList
