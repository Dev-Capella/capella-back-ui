import React, { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Chips } from "primereact/chips";
import ResponseStatus from "../../Manager/ResponseStatus";
import classificationService from "../../Manager/Service/classificationService";
import { Messages } from "primereact/messages";
import { Dropdown } from "primereact/dropdown";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

const defaultValues = {
  dataType: 1,
  options: [],
  code: "",
  name: "",
};

export default function DetailClassification({ code, setSideVisible }) {
  const dataTypes = classificationService.getClassificationDataTypes();
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const msg = useRef(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({ defaultValues });

  useEffect(() => {
    classificationService.getbyClassification(code).then((result) => {
      console.log(result);
      if (result.status === ResponseStatus.SUCCESS) {
        setValue("code", result.data.code);
        setValue("name", result.data.name);
        setValue("dataType", result.data.dataType);
        setValue("options", result.data.options);
      }
    });
  }, []);

  const onSubmit = (data) => {
    data.code = code;

    setIsLoading(true);
    if (data.options.length > 0) {
      data.options = data.options.map((x) => {
        return { name: x, code: "a" };
      });
    }

    classificationService
      .updateClassifications(data)
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

  const deleteTag = (code, name) => {
    setIsLoading(true);
    classificationService.deleteClassifications(code).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        setSideVisible(false);
        setIsLoading(false);
      }
    });
  };

  const deleteConfirm = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Etiket siliniyor. Emin misiniz?",
      header: "İşlem Onay",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",

      accept: () => deleteTag(code, getValues("name")),
      reject,
    });
  };

  const reject = () => {};

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  const dataTypeChange = (event, field) => {
    field.onChange(event.value);
    setIsOptionsVisible(
      dataTypes.filter((x) => x.code === event.value)[0].optionsVisible
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <ConfirmPopup />
        <div className="surface-border border-top-1 opacity-100 mt-3 mb-3 col-12"></div>
        <form className="p-fluid grid formgrid">
          <div className="field md:col-12 col-12">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Etiket Adı alanı zorunludur." }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.name })}
                  >
                    Etiket
                  </label>
                  <InputText
                    placeholder="Etiket İsmi"
                    id={field.name}
                    {...field}
                    autoFocus
                    className={classNames({ "p-invalid": fieldState.invalid })}
                  />
                </>
              )}
            />
            {getFormErrorMessage("name")}
          </div>
          <div className="field md:col-12 col-12">
            <Controller
              name="dataType"
              control={control}
              rules={{ required: "Etiket Adı alanı zorunludur." }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.dataType}
                    className={classNames({ "p-error": errors.dataType })}
                  >
                    Etiket
                  </label>
                  <Dropdown
                    value={field.dataType}
                    options={dataTypes}
                    optionLabel="name"
                    optionValue="code"
                    placeholder="Veri Türleri"
                    id={field.name}
                    {...field}
                    onChange={(event) => dataTypeChange(event, field)}
                    autoFocus
                    className={classNames({
                      "p-invalid": fieldState.invalid,
                    })}
                  />
                </>
              )}
            />
            {getFormErrorMessage("dataType")}
          </div>
          {isOptionsVisible && (
            <div className="field md:col-12 col-12">
              <Controller
                name="options"
                control={control}
                rules={{ required: "Seçenekler zorunludur." }}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.options}
                      className={classNames({ "p-error": errors.options })}
                    >
                      Seçenekler
                    </label>
                    <Chips
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      placeholder="Seçenekler"
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  </>
                )}
              />
              {getFormErrorMessage("options")}
            </div>
          )}
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
  );
}
