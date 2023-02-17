import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useQuery } from "react-query";
import supplierService from "../../Manager/Service/supplierService";
import { useNavigate } from "react-router-dom";
import ResponseStatus from "../../Manager/ResponseStatus";
import { InputTextarea } from "primereact/inputtextarea";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Messages } from "primereact/messages";
function AddSupplier() {
  const navigate = useNavigate();

  const defaultValues = {
    name: "",
    email: "",
    telephone: "",
    company: "",
    employeeName: "",
    taxNumber: "",
    address: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    supplierService.addSuppliers(data).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        navigate(-1);
      }
    });
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const reject = () => {};
  const confirm1 = () => {
    confirmDialog({
      message: "Tedarikçi kaydediliyor. Emin misiniz?",
      header: "İşlem Onay",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      accept: handleSubmit((data) => onSubmit(data)),
      reject,
    });
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <ConfirmDialog />
            <h5>Tedarikçi Ekle</h5>
            <span className="p-buttonset">
              <Button
                className="p-button-sm font-bold"
                label="Save"
                icon="pi pi-check"
                onClick={confirm1}
              />
              <Button
                className="p-button-sm font-bold"
                label="Cancel"
                icon="pi pi-times"
                onClick={() => navigate(-1)}
              />
            </span>
          </div>
          <div className="flex justify-content-between mb-2 align-items-center">
            <form className="p-fluid grid formgrid w-full">
              <div className="field md:col-6 col-12">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Zorunlu Alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className={classNames({
                          "p-error": errors.name,
                        })}
                      >
                        Tedarik adı
                      </label>
                      <InputText
                        placeholder="Tedarik adı"
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
              <div className="field md:col-6 col-12">
                <Controller
                  name="employeeName"
                  control={control}
                  rules={{ required: "Zorunlu Alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.employeeName}
                        className={classNames({
                          "p-error": errors.employeeName,
                        })}
                      >
                        Eleman Adı
                      </label>
                      <InputText
                        placeholder="Eleman adı"
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
              <div className="field md:col-6 col-12">
                <Controller
                  name="taxNumber"
                  control={control}
                  rules={{ required: "Zorunlu Alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.taxNumber}
                        className={classNames({
                          "p-error": errors.taxNumber,
                        })}
                      >
                        Vergi numarası
                      </label>
                      <InputText
                        placeholder="Vergi numarası"
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
              <div className="field md:col-6 col-12">
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Zorunlu Alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.email}
                        className={classNames({
                          "p-error": errors.email,
                        })}
                      >
                        E-mail Adresi
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
              <div className="field md:col-6 col-12">
                <Controller
                  name="company"
                  control={control}
                  rules={{ required: "Zorunlu Alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.company}
                        className={classNames({
                          "p-error": errors.company,
                        })}
                      >
                        Şirket adı
                      </label>
                      <InputText
                        placeholder="Şirket adı"
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
              <div className="field md:col-6 col-12">
                <Controller
                  name="telephone"
                  control={control}
                  rules={{ required: "Zorunlu Alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.telephone}
                        className={classNames({
                          "p-error": errors.telephone,
                        })}
                      >
                        Telefon numarası
                      </label>
                      <InputText
                        placeholder="Telefon numarası"
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
              <div className="field md:col-12 col-12">
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: "Zorunlu Alan." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.address}
                        className={classNames({
                          "p-error": errors.address,
                        })}
                      >
                        Açık adres
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

export default AddSupplier;
