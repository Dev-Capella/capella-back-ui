import React, { useState, useEffect, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { MultiSelect } from "primereact/multiselect";
import { useQuery } from "react-query";
import classificationService from "../../../../Manager/Service/classificationService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { ProductDetailContext } from "../Context/ProductDetailContext";

const defaultValues = {
  classifications: []
};

export default function ProductDetailAttributeValue() {
  const { classificationAttributeValues, setClassificationAttributeValues, selectedClassifications } =
    useContext(ProductDetailContext);

  const { data } = useQuery("classifications", () =>
    classificationService.fetchClassifications()
  );
  const {
    control,
    formState: { errors },
    setValue
  } = useForm({ defaultValues });

  const onRowEditComplete = (newData, index) => {
    let _attributeValues = [...classificationAttributeValues];
    _attributeValues[index] = newData;
    setClassificationAttributeValues(_attributeValues);
  };


  const textEditor = (options, index) => {
    return (
      <div className="md:col-6 col-12">
        <InputText
          type="text"
          value={options.value}
          placeholder="Değer"
          className="w-full"
          onChange={(e) =>
            onRowEditComplete({ ...options, value: e.target.value }, index)
          }
        />
      </div>
    );
  };

  const inputNumberEditor = (options, index) => {
    return (
      <div className="md:col-6 col-12">
        <InputNumber
          value={options.value}
          placeholder="Değer"
          className="w-full"
          onChange={(e) =>
            onRowEditComplete({ ...options, value: e.value }, index)
          }
        />
      </div>
    );
  };

  const switchEditor = (options, index) => {
    return (
      <div className="md:col-6 col-12">
        <InputSwitch
          checked={options.value}
          onChange={(e) =>
            onRowEditComplete({ ...options, value: e.target.value }, index)
          }
        />
      </div>
    );
  };

  const dropdownEditor = (options, index) => {
    return (
      <div className="md:col-6 col-8">
        <Dropdown
          value={options.options[0]}
          options={options.classification.options}
          optionLabel="name"
          placeholder="Değer"
          className="w-full"
          onChange={(e) =>
            onRowEditComplete({ ...options, options: [e.value] }, index)
          }
        />
      </div>
    );
  };

  const multiselectEditor = (options, index) => {
    return (
      <div className="md:col-6 col-8">
        <MultiSelect
          display="chip"
          optionLabel="name"
          placeholder="Değer"
          className="w-full"
          value={options.options}
          options={options.classification.options}
          onChange={(e) =>
            onRowEditComplete({ ...options, options: e.value }, index)
          }
        />
      </div>
    );
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const renderSwitch = (data, index) => {
    switch (data.classification.dataType) {
      case 0:
        return <React.Fragment>{textEditor(data, index)}</React.Fragment>;
      case 1:
        return (
          <React.Fragment>{inputNumberEditor(data, index)}</React.Fragment>
        );
      case 2:
        return <React.Fragment>{switchEditor(data, index)}</React.Fragment>;
      case 3:
        return <React.Fragment>{dropdownEditor(data, index)}</React.Fragment>;
      case 4:
        return (
          <React.Fragment>{multiselectEditor(data, index)}</React.Fragment>
        );
      default:
        return "";
    }
  };

  const getDefaultValue = (dataType, value) => {
    switch (dataType) {
      case 0:
        return !!value ? value : "";
      case 1:
        return !!value ? value : 0;
      case 2:
        return !!value ? value : false;
      default:
        return null;
    }
  };

  const getDataType = (data, index) => {
    return renderSwitch(data, index);
  };
  useEffect(()=>{
    console.log(data);
    console.log(selectedClassifications)
    setValue("classifications",selectedClassifications)

  },[selectedClassifications])
  const selectedClassification = (event, field) => {
    var value = event.value.map((x, index) => {
      var filteredValue = classificationAttributeValues.filter((item) => {
        return item.classification.code === x.code;
      })[0];
      return {
        id:filteredValue?.id,
        code:filteredValue?.code,
        classification: { ...x },
        options: filteredValue?.options ? [...filteredValue?.options] : [],
        value: getDefaultValue(x.dataType, filteredValue?.value),
      };
    });
    field.onChange(event.value);
    setClassificationAttributeValues(value);
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card shadow-1">
          <span className="text-xl font-bold col-12">
            Sınıflandırma Alanları
          </span>
          <form className="p-fluid formgrid mt-3">
            <div className="field md:col-6 col-12">
              <Controller
                name="classifications"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      className={classNames({
                        "p-error": errors.classifications,
                      })}
                    >
                      Sınıflandırma Alanları
                    </label>
                    <MultiSelect
                      value={field.value}
                      options={data}
                      onChange={(e) => selectedClassification(e, field)}
                      optionLabel="name"
                      placeholder="Sınıflandırma seçiniz"
                      display="chip"
                      appendTo="self"
                    />
                  </>
                )}
              />
              {getFormErrorMessage("categories")}
            </div>
          </form>
          {classificationAttributeValues.length > 0 && (
            <div className="col-12">
              <DataTable
                value={classificationAttributeValues}
                key="code"
                responsiveLayout="scroll"
              >
                <Column
                  field="classification.name"
                  header="Sınıflandırma Verisi"
                  style={{ width: "20rem" }}
                ></Column>
                <Column
                  header="Değer"
                  style={{ width: "60rem" }}
                  body={(data, options) => {
                    return getDataType(data, options.rowIndex);
                  }}
                ></Column>
              </DataTable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
