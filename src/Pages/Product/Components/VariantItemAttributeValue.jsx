import React, { useState, useEffect, useRef, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { MultiSelect } from "primereact/multiselect";
import { useQuery } from "react-query";
import classificationService from "../../../Manager/Service/classificationService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ProductContext } from "../Context/ProductContext";
import { OverlayPanel } from "primereact/overlaypanel";

export default function VariantItemAttributeValue({
  setVariantOptionsModalVisible,
}) {
  const op = useRef(null);
  const {
    selectedVariantItemIndex,
    variantItems,
    setVariantItems,
    selectedVariantItems,
  } = useContext(ProductContext);
  const attributeValues =
    variantItems[selectedVariantItemIndex]?.classificationAttributeValues;

  const [selectedAttributeValues, setSelectedAttributeValues] = useState([
    ...attributeValues,
  ]);
  const { data, isLoading } = useQuery("classifications", () =>
    classificationService.fetchClassifications()
  );

  const defaultValues = {
    classifications:
      variantItems[selectedVariantItemIndex].selectedClassification,
  };
  const toast = useRef(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({ defaultValues });

  const onRowEditComplete = (newData, index) => {
    let _attributeValues = [...selectedAttributeValues];
    _attributeValues[index] = newData;
    setSelectedAttributeValues(_attributeValues);
  };

  const setSelectedVariantItemClassificationAttributeValue = (data) => {
    if (
      selectedVariantItems.length > 0 &&
      selectedVariantItems.filter((x) => x.index === selectedVariantItemIndex)
        .length > 0
    ) {
      selectedVariantItems.forEach((product) => {
        variantItems[product.index].classificationAttributeValues = [...data];
      });
    } else {
      variantItems[selectedVariantItemIndex].classificationAttributeValues = [
        ...data,
      ];
    }
    setVariantItems([...variantItems]);
  };
  const setVariantItemSelectedClassifications = (data) => {
    if (
      selectedVariantItems.length > 0 &&
      selectedVariantItems.filter((x) => x.index === selectedVariantItemIndex)
        .length > 0
    ) {
      selectedVariantItems.forEach((product) => {
        variantItems[product.index].selectedClassification = [...data];
      });
    } else {
      variantItems[selectedVariantItemIndex].selectedClassification = [...data];
    }
    setVariantItems([...variantItems]);
  };

  const saveAttributeValues = () => {
    if (isValidated()) {
      setSelectedVariantItemClassificationAttributeValue([
        ...selectedAttributeValues,
      ]);
      if (getValues("classifications")) {
        setVariantItemSelectedClassifications([
          ...getValues("classifications"),
        ]);
      }
      setVariantOptionsModalVisible(false);
    }
  };

  const cancelSideBar = () => {
    setVariantOptionsModalVisible(false);
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

  const getDataType = (data, index) => {
    return renderSwitch(data, index);
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

  const selectedClassification = (event, field) => {
    var value = event.value.map((x, index) => {
      var filteredValue = selectedAttributeValues.filter((item) => {
        return item.classification.code === x.code;
      })[0];
      return {
        classification: { ...x },
        options: filteredValue?.options ? [...filteredValue?.options] : [],
        value: getDefaultValue(x.dataType, filteredValue?.value),
      };
    });
    field.onChange(event.value);
    setSelectedAttributeValues(value);
  };
  const isValidated = () => {
    var isValidatedParam = true;
    selectedAttributeValues.forEach((element) => {
      if (
        element.classification.dataType === 3 ||
        element.classification.dataType === 4
      ) {
        if (element.options.length === 0) {
          toast.current.show({
            severity: "error",
            summary: "Hatalı İşlem",
            detail: "Lütfen boş alanları doldurunuz!",
          });
          isValidatedParam = false;
        }
      } else {
        if (element.value == null || element.value.length === 0) {
          toast.current.show({
            severity: "error",
            summary: "Hatalı İşlem",
            detail: "Lütfen boş alanları doldurunuz!",
          });
          isValidatedParam = false;
        }
      }
    });
    return isValidatedParam;
  };
 
  return (
    <React.Fragment>
      <div
        className="absolute top-0 left-0 w-full h-5rem p-3 flex align-items-center mb-3 justify-content-between z-1 shadow-2"
        style={{ backgroundColor: "white" }}
      >
         <span className="text-3xl font-bold">
          {variantItems[selectedVariantItemIndex]?.name} - Sınıflandırma Alanları
        </span>

        <span className="p-buttonset">
          <Button
            className="p-button-sm font-bold"
            label="Cancel"
            icon="pi pi-times"
            onClick={() => cancelSideBar()}
          />
          <Button
            className="p-button-sm font-bold"
            label="Save"
            icon="pi pi-check"
            onClick={() => saveAttributeValues()}
          />
        </span>
      </div>
      <div className="grid mt-7 relative">
        <Toast ref={toast} position="top-center" />

        <div className="flex justify-content-center col-12">
          <div className="card shadow-2">
            <div className="flex justify-content-between align-items-center">
                <div>
                  <div className="text-2xl font-bold">Sınıflandırma Alanları</div>
                  <span className="text-sm">Ürünüze yeni sınıflandırma alanları ekleyebilir veya düzenleyebilirsiniz.</span>
                </div>
                <div>
              {selectedVariantItems.some(
              (x) => x.index === selectedVariantItemIndex
            ) &&
              selectedVariantItems.length > 1 && (
                <Button
                  type="button"
                  className="p-button-text"
                  icon="pi pi-angle-down"
                  label={selectedVariantItems.length + " varyant seçili"}
                  onClick={(e) => op.current.toggle(e)}
                />
              )}

            <OverlayPanel ref={op}>
              {selectedVariantItems.map((variant) => {
                return <div>{variant.name}</div>;
              })}
            </OverlayPanel>
              </div>
            </div>
            <form className="p-fluid formgrid mt-4">
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
                        Sınıflandırma
                      </label>
                      <MultiSelect
                        value={field.value}
                        options={data}
                        onChange={(e) => selectedClassification(e, field)}
                        optionLabel="name"
                        placeholder="Sınıflandırma seçiniz"
                        display="chip"
                      />
                    </>
                  )}
                />
                {getFormErrorMessage("categories")}
              </div>
              
            </form>
            <div className="col-12">
            <DataTable
              value={selectedAttributeValues}
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
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
