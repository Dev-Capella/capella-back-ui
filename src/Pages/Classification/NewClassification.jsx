import React, { useState } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import classificationService from "../../Manager/Service/classificationService";
import categoryService from "../../Manager/Service/categoryService";
import unitService from "../../Manager/Service/unitService";
import { Dropdown } from "primereact/dropdown";
import { useQuery } from "react-query";
import { MultiSelect } from "primereact/multiselect";
import { TreeSelect } from "primereact/treeselect";
import { Chips } from "primereact/chips";
import ResponseStatus from "../../Manager/ResponseStatus";

const defaultValues = {
  name: "",
  dataType: "",
  options: [],
};

export default function NewClassification({ setNewSideVisible }) {
  const [isLoading, setIsLoading] = useState(false);
  const dataTypes = classificationService.getClassificationDataTypes();
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setIsLoading(true);
    if (data.options.length > 0) {
      data.options = data.options.map((x) => {
        return { name: x };
      });
    }

    classificationService
      .addClassification(data)
      .then((result) => {
        if (result.status === ResponseStatus.SUCCESS) {
          setNewSideVisible(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const dataTypeChange = (event, field) => {
    field.onChange(event.value);
    setIsOptionsVisible(dataTypes.filter(x=>x.code===event.value)[0].optionsVisible);
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="surface-border border-top-1 opacity-100 mt-3 mb-3 col-12"></div>
        <form className="p-fluid grid formgrid">
          <div className="field md:col-12 col-12">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Sınıflandırma verisi alanı zorunludur." }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.name })}
                  >
                    Sınıflandırma Verisi
                  </label>
                  <InputText
                    placeholder="Sınıflandırma Verisi"
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
              rules={{ required: "Veri türü zorunludur." }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.dataType}
                    className={classNames({ "p-error": errors.dataType })}
                  >
                    Veri Türü
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
          <div className="absolute right-0 bottom-0 mb-3 mr-3">
            <Button
              className="p-button-sm font-bold"
              label="Kaydet"
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
