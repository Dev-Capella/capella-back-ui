import React, { useEffect, useState, useRef } from "react";
import supplierService from "../../Manager/Service/supplierService";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ResponseStatus from "../../Manager/ResponseStatus";
import { InputTextarea } from "primereact/inputtextarea";
import { Messages } from "primereact/messages";
const defaultUserFormValues = {
  code: "",
  name: "",
  email: "",
  telephone: "",
  company: "",
  employeeName: "",
  taxNumber: "",
  address: "",
};

function DetailSupplier() {
  const successMsg = useRef(null);
  const [supplierName, setSupplierName] = useState();
  const slug = useParams();
  const [deletedCode, setDeletedCode] = useState();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ defaultUserFormValues });

  useEffect(() => {
    supplierService.getBySuppliersId(slug.supplierId).then((result) => {
      setValue("code", result.data.code);
      setValue("name", result.data.name);
      setValue("email", result.data.email);
      setValue("telephone", result.data.telephone);
      setValue("company", result.data.company);
      setValue("employeeName", result.data.employeeName);
      setValue("taxNumber", result.data.taxNumber);
      setValue("address", result.data.address);
      setSupplierName(result.data.name);
      setDeletedCode(result.data.code);
    });
  }, []);
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  const accept = (data) => {
    supplierService.updateSuppliers(data).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        navigate(-1);
      }
    });
  };
  const reject = () => {
    navigate(-1);
  };
  const SaveConfirm = () => {
    confirmDialog({
      message: "Tedarikçi kaydediliyor. Emin misiniz?",
      header: "İşlem Onay",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      accept: handleSubmit((data) => accept(data)),
      reject,
    });
  };

  const deleteConfirm = () => {
    confirmDialog({
      message: "Tedarikçi siliniyor. Emin misiniz?",
      header: "İşlem Onay",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      accept: handleSubmit((data) => deleteSupplier(data)),
      reject,
    });
  };
  const deleteSupplier = (data) => {
    supplierService.deleteSuppliers(data.code).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        navigate(-1, { param: "hello" });
      }
    });
  };
  return (
    <div className="grid">
      <div className="col-12">
        <Messages ref={successMsg}></Messages>
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <ConfirmDialog />
            <h5>@{supplierName && supplierName}</h5>
            <div>
              <span className="p-buttonset">
                <Button
                  className="p-button-sm font-bold"
                  label="Kaydet"
                  icon="pi pi-check"
                  onClick={SaveConfirm}
                />
                <Button
                  className="p-button-sm font-bold"
                  label="İptal"
                  icon="pi pi-times"
                  onClick={() => navigate(-1)}
                />
                <Button
                  className="p-button-sm p-button-danger font-bold"
                  label="Sil"
                  icon="pi pi-trash"
                  onClick={() => deleteConfirm()}
                />
              </span>
            </div>
          </div>
          <div className="flex justify-content-between mb-2 align-items-center">
            <form className="p-fluid grid formgrid w-full">
              <div className="field md:col-6 col-6">
                <Controller
                  name="employeeName"
                  control={control}
                  rules={{ required: "Zorunlu alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.employeeName}
                        className={classNames({
                          "p-error": errors.employeeName,
                        })}
                      >
                        Eleman adı
                      </label>
                      <InputText
                        placeholder="Adı"
                        id={field.employeeName}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage("employeeName")}
              </div>
              <div className="field md:col-6 col-6">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Zorunlu alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className={classNames({
                          "p-error": errors.name,
                        })}
                      >
                        Tedarik Adı
                      </label>
                      <InputText
                        placeholder="Adı"
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage("name")}
              </div>
              <div className="field md:col-6 col-6">
                <Controller
                  name="taxNumber"
                  control={control}
                  rules={{ required: "Zorunlu alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.taxNumber}
                        className={classNames({ "p-error": errors.taxNumber })}
                      >
                        Vergi Numarası
                      </label>
                      <InputText
                        placeholder="Adı"
                        id={field.taxNumber}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage("taxNumber")}
              </div>
              <div className="field md:col-6 col-6 ">
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Zorunlu Alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.email}
                        className={classNames({ "p-error": errors.email })}
                      >
                        E-mail
                      </label>
                      <InputText
                        placeholder="E-mail"
                        id={field.email}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage("email")}
              </div>
              <div className="field md:col-6 col-6 ">
                <Controller
                  name="company"
                  control={control}
                  rules={{ required: "Zorunlu Alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className={classNames({ "p-error": errors.company })}
                      >
                        Şirket Adı
                      </label>
                      <InputText
                        placeholder="Şirket"
                        id={field.company}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage("company")}
              </div>
              <div className="field md:col-6 col-6 ">
                <Controller
                  name="telephone"
                  control={control}
                  rules={{ required: "Zorunlu Alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.telephone}
                        className={classNames({ "p-error": errors.telephone })}
                      >
                        Telefon
                      </label>
                      <InputText
                        placeholder="Telefon"
                        id={field.telephone}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage("telephone")}
              </div>
              <div className="field md:col-12 col-12 ">
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: "Zorunlu Alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.address}
                        className={classNames({ "p-error": errors.address })}
                      >
                        Adres
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Adres"
                        id={field.address}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage("address")}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSupplier;
