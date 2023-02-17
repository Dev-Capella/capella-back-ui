import React,{useEffect, useRef} from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import userService from '../../Manager/Service/userService.js'
import { useService } from '../../Hooks/useService'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ResponseStatus from "../../Manager/ResponseStatus";
import { Messages } from "primereact/messages";
import { Message } from "primereact/message";

function UserManagement() {
  const { data, isLoading, refetch } = useService("users", () =>
    userService.getUsers()
  );
  const navigate = useNavigate();
  const successMsg = useRef(null);

  const actionBodyTemplate = ({ username }) => {
    return (
      <React.Fragment>
        <Button
          className="ml-2 p-button-info p-button-rounded "
          type="button"
          icon="pi pi-cog"
          onClick={() => navigate(username)}
        ></Button>
        <Button
          className="ml-2 p-button-danger p-button-rounded"
          type="button"
          icon="pi pi-times"
          onClick={() => deleteConfirm(username)}
        ></Button>
      </React.Fragment>
    );
  };

  const deleteUser = (username) => {
    userService.deleteUser(username).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        refetch();
        successMsg.current.show([
          {
            severity: "success",
            summary: "Başarılı",
            detail: username + " kullanıcısı silindi.",
            sticky: false,
          },
        ]);
      }
    });
  };

  const reject = () => {};

  const deleteConfirm = (username) => {
    confirmDialog({
      message: "Kullanıcı siliniyor. Emin misiniz?",
      header: "İşlem Onay",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      accept: () => deleteUser(username),
      reject,
    });
  };

  const dateTemplate = (rowData, column) => {
    return new Date(rowData["birthDate"]).toLocaleDateString();
  };

  return (
    <div className="grid">
      <div className="col-12">
        <Messages ref={successMsg}></Messages>
        <div className="card">
          <ConfirmDialog />
          <h5>Kullanıcı Yönetimi</h5>
          <DataTable
            value={data}
            paginator
            rows={10}
            dataKey="id"
            filterDisplay="menu"
            loading={isLoading}
            responsiveLayout="scroll"
            emptyMessage="No customers found."
          >
            <Column field="firstname" header="Ad"></Column>
            <Column field="lastname" header="Soyad"></Column>
            <Column field="username" header="Kullanıcı Adı"></Column>
            <Column field="email" header="Eposta"></Column>
            <Column
              field="birthDate"
              header="Doğum Tarihi"
              body={dateTemplate}
            ></Column>
            <Column field="isActive" header="Durum"></Column>

            <Column
              body={(e) => actionBodyTemplate(e)}
              style={{ minWidth: "4rem" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default UserManagement
