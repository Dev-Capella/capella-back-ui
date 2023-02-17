import React, { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import ResponseStatus from "../../Manager/ResponseStatus";
import brandService from "../../Manager/Service/brandService";
import { Messages } from "primereact/messages";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

const defaultValues = {
  id: "",
  code: "",
  name: "",
};

export default function DetailBrand({ code, setSideVisible }) {
  const [isLoading, setIsLoading] = useState(false);
  const successMsg = useRef(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({ defaultValues });

  useEffect(() => {
    brandService.getByCode(code).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        setValue("id", result.data.id);
        setValue("name", result.data.name);
        setValue("code", result.data.code);
      }
    });
  }, []);

  const onSubmit = (data) => {
    data.code = code;

    setIsLoading(true);

    brandService
      .updateBrand(data)
      .then((result) => {
        if (result.status === ResponseStatus.SUCCESS) {
          setSideVisible(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const deleteBrand = (code, name) => {
    setIsLoading(true);
    brandService.deleteBrand(code).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        setSideVisible(false);
        setIsLoading(false);
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

  const deleteConfirm = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Marka siliniyor. Emin misiniz?",
      header: "İşlem Onay",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",

      accept: () => deleteBrand(code, getValues("name")),
      reject,
    });
  };

  const reject = () => {};

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <>
      <Messages className="w-full" ref={successMsg}></Messages>
      <div className="grid">
        <div className="col-12">
          <ConfirmPopup />
          <div className="surface-border border-top-1 opacity-100 mt-3 mb-3 col-12"></div>
          <form className="p-fluid grid formgrid">
            <div className="field md:col-12 col-12">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Marka Adı alanı zorunludur." }}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className={classNames({ "p-error": errors.name })}
                    >
                      Marka
                    </label>
                    <InputText
                      placeholder="Marka İsmi"
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
            <div className="absolute left-0 bottom-0 mb-3 ml-3">
              <Button
                className="p-button-outlined p-button-danger"
                icon="pi pi-trash"
                label="Sil"
                type="button"
                loading={isLoading}
                onClick={(event) => {
                  deleteConfirm(event);
                }}
              />
            </div>
            <div className="absolute right-0 bottom-0 mb-3 mr-3">
              <Button
                className="p-button-sm font-bold"
                label="Kaydet"
                type="submit"
                icon="pi pi-check"
                loading={isLoading}
                onClick={handleSubmit((data) => onSubmit(data))}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
