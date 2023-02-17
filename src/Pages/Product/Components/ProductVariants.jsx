import React, { useState, useRef, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { MultiSelect } from "primereact/multiselect";
import variantService from "../../../Manager/Service/variantService";
import { useQuery } from "react-query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import ProductImageSidebar from "./ProductImageSidebar";
import { Sidebar } from "primereact/sidebar";
import { Image } from "primereact/image";
import { Badge } from "primereact/badge";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import VariantItemAttributeValue from "./VariantItemAttributeValue";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { ProductContext } from "../Context/ProductContext";

export default function ProductVariants() {
  const {
    variantItems,
    setVariantItems,
    variants,
    setVariants,
    productFilesBinary,
    selectedVariantItemIndex,
    setSelectedVariantItemIndex,
    selectedVariantItem,
    setSelectedVariantItem,
    selectedVariantItems,
    setSelectedVariantItems,
    setProductFilesBinary,
  } = useContext(ProductContext);

  const menu = useRef(null);
  const toast = useRef(null);

  const defaultValues = {
    variants: variants,
  };
  const [addImageSideBarVisible, setAddImageSideBarVisible] = useState(false);
  const [variantOptionsModalVisible, setVariantOptionsModalVisible] =
    useState(false);

  const { data: variantsData } = useQuery("variants", () =>
    variantService.fetchVariants()
  );

  const items = [
    {
      items: [
        {
          label: "Sınıflandırma Verisi Ekle",
          icon: "pi pi-eye",
          command: () => {
            setVariantOptionsModalVisible(true);
          },
        },
        {
          label: variantItems[selectedVariantItemIndex]?.active
            ? "Satışa Kapa"
            : "Satışa Aç",
          icon: variantItems[selectedVariantItemIndex]?.active
            ? "pi pi-check-circle"
            : "pi pi-times-circle",
          command: () => {
            let _variantItems = [...variantItems];

            if (
              selectedVariantItems.length > 0 &&
              selectedVariantItems.filter(
                (x) => x.index === selectedVariantItemIndex
              ).length > 0
            ) {
              selectedVariantItems.forEach((product) => {
                _variantItems[product.index].active =
                  !_variantItems[product.index].active;
              });
            } else {
              _variantItems[selectedVariantItemIndex].active =
                !_variantItems[selectedVariantItemIndex].active;
            }
            setVariantItems([..._variantItems]);

            const removedArray = [
              ...selectedVariantItems.filter((x) => {
                return x.active !== false;
              }),
            ];
            setSelectedVariantItems([...removedArray]);
          },
        },
      ],
    },
  ];

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ defaultValues });

  const selectedVariant = (event, field) => {
    if (event.value.length > 3) {
      toast.current.show({
        severity: "warn",
        summary: "Uyarı",
        detail: "En fazla 3 adet Varyant Seçebilirsiniz.",
      });
      return;
    }
    setVariants(event.value);
    field.onChange(event.value);
    variantItemsChangesData(event.value);
    setProductFilesBinary([]);
  };

  const cartesian = (...args) => {
    var r = [],
      max = args.length - 1;
    function helper(arr, i) {
      for (var j = 0, l = args[i].length; j < l; j++) {
        var a = arr.slice(0); // clone arr
        a.push(args[i][j]);
        if (i == max) r.push(a);
        else helper(a, i + 1);
      }
    }
    helper([], 0);
    return r;
  };

  const variantItemsChangesData = (selectedVariants) => {
    if (selectedVariants.length > 0) {
      var cartesianItems = cartesian(
        ...selectedVariants.map((variant) =>
          variant.variantValues.map((x) => {
            return { code: x.code, name: x.name };
          })
        )
      );
      var joinedCartesianArray = cartesianItems.map(function (item, index) {
        return {
          index: index,
          name: item
            .map((x) => {
              return x.name;
            })
            .join(","),
          variantValues: item.map((x) => {
            return { code: x.code };
          }),
          files: [...productFilesBinary],
          classificationAttributeValues: [],
          price: 0,
          discountPrice: 0,
          barcode: "",
          active: true,
        };
      });
      setVariantItems(joinedCartesianArray);
    } else {
      setVariantItems([]);
    }
  };

  const deleteSelectedVariant = (variant) => {
    //delete item
    var index = variants.indexOf(variant);
    variants.splice(index, 1);

    //set new Value form and state
    setValue("variants", variants);
    setVariants([...variants]);

    //set new variants
    variantItemsChangesData(variants);
  };

  const addImageButtonClickEvent = (name, rowIndex) => {
    setSelectedVariantItem({ name });
    setAddImageSideBarVisible(true);
    setSelectedVariantItemIndex(rowIndex);
  };

  const changeRowVariantPrice = (data, index) => {
    return (
      <InputNumber
        value={data.price}
        placeholder="Değer"
        className="w-full"
        mode="decimal"
        onChange={(e) => onRowEditComplete({ price: e.value }, index)}
      />
    );
  };

  const changeRowDiscountPrice = (data, index) => {
    return (
      <InputNumber
        value={data.discountPrice}
        placeholder="Değer"
        className="w-full"
        mode="decimal"
        onChange={(e) => onRowEditComplete({ discountPrice: e.value }, index)}
      />
    );
  };

  const changeRowBarcode = (data, index) => {
    return (
      <InputText
        type="text"
        value={data.barcode}
        placeholder="Barkod"
        className="w-full"
        onChange={(e) => onRowEditComplete({ barcode: e.target.value }, index)}
      />
    );
  };

  const onRowEditComplete = (newData, index) => {
    let _variantItems = [...variantItems];

    if (
      selectedVariantItems.length > 0 &&
      selectedVariantItems.filter((x) => x.index === index).length > 0
    ) {
      selectedVariantItems.forEach((product) => {
        var lastData = _variantItems[product.index];
        _variantItems[product.index] = { ...lastData, ...newData };
      });
    } else {
      _variantItems[index] = { ..._variantItems[index], ...newData };
    }
    setVariantItems(_variantItems);
  };

  const mediasColumnBody = (data, options) => {
    if (data.files.length > 0) {
      //const fileUrl = URL.createObjectURL(data.files[0]);
      const fileUrl = data.files[0].url;
      return (
        <div className="relative ">
          {data.files.length !== 1 && (
            <Badge
              className="absolute top-0 right-0"
              value={"+" + (data.files.length - 1)}
            />
          )}
          <Image
            imageClassName="mt-2 mr-2 cursor-pointer"
            src={fileUrl}
            onClick={() =>
              addImageButtonClickEvent(data.name, options.rowIndex)
            }
            alt="Image"
            height="50"
            width="50"
          />
        </div>
      );
    }
    return (
      <Button
        icon="pi pi-plus"
        onClick={() => addImageButtonClickEvent(data.name, options.rowIndex)}
        className=""
        aria-label="Cancel"
      />
    );
  };

  const onSelectedVariantOptions = (data, rowIndex) => {
    return (
      <>
        <Menu
          model={items}
          popup
          ref={menu}
          id="popup_menu"
          className="w-auto"
          onChange={() => setSelectedVariantItemIndex(rowIndex)}
        />
        <Button
          className="p-button-text"
          iconPos="right"
          label="İşlemler"
          icon="pi pi-angle-down"
          onClick={(event) => menuToggle(event, rowIndex)}
          aria-controls="popup_menu"
          aria-haspopup
        />
      </>
    );
  };

  const isSelectable = (value, field) => {
    return value;
  };

  const isRowSelectable = (event) => {
    const data = event.data;

    return isSelectable(data.active);
  };
  
  const cellClassName = (value, options) => {
    const { field, rowIndex } = options;
    if (field === "options") {
      return "";
    }

    return isSelectable(variantItems[rowIndex].active) ? "" : "p-disabled";
  };

  const menuToggle = (event, index) => {
    menu.current.toggle(event);
    setSelectedVariantItemIndex(index);
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="grid">
      <Toast ref={toast} position="top-center" style={{ zIndex: 999 }} />
      <Sidebar
        visible={addImageSideBarVisible}
        position="right"
        style={{ width: "30em" }}
        onHide={() => setAddImageSideBarVisible(false)}
      >
        <h3>{selectedVariantItem?.name}</h3>
        <ProductImageSidebar />
      </Sidebar>
      <Sidebar
        visible={variantOptionsModalVisible}
        fullScreen
        style={{ backgroundColor: "rgb(243, 245, 249)" }}
        showCloseIcon={false}
        closeOnEscape={false}
        onHide={() => setVariantOptionsModalVisible(false)}
      >
        <VariantItemAttributeValue
          setVariantOptionsModalVisible={(data) =>
            setVariantOptionsModalVisible(data)
          }
        />
      </Sidebar>
      <div className="col-12">
        <div className="card shadow-1">
          <span className="text-xl font-bold col-12">Varyantlar</span>
          <form className="p-fluid formgrid mt-3">
            <div className="field md:col-6 col-12">
              <Controller
                name="variants"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      className={classNames({
                        "p-error": errors.variants,
                      })}
                    >
                      Varyant
                    </label>
                    <MultiSelect
                      value={field.value}
                      options={variantsData}
                      onChange={(e) => selectedVariant(e, field)}
                      optionLabel="name"
                      placeholder="Varyant seçiniz"
                      display="chip"
                      appendTo="self"
                    />
                  </>
                )}
              />
              {getFormErrorMessage("variants")}
            </div>
          </form>
          <div className="col-12">
            {variants.map((variant) => {
              return (
                <div
                  key={variant.code}
                  className="flex border-1 surface-border col-12 justify-content-between align-items-center mb-1"
                >
                  <span key={variant.code}>{variant.name}</span>
                  <span>
                    {variant.variantValues.map((variantValue) => {
                      return (
                        <Chip
                          key={variantValue.code}
                          label={variantValue.name}
                          className="mr-1 h-2rem custom-chip"
                        />
                      );
                    })}
                  </span>
                  <Button
                    icon="pi pi-trash"
                    onClick={() => deleteSelectedVariant(variant)}
                    className="p-button-text p-button-danger p-button-outlined h-2rem"
                    aria-label="Cancel"
                  />
                </div>
              );
            })}
          </div>
          {variantItems.length > 0 && (
            <div className="col-12 mt-3">
              <DataTable
                className=""
                value={variantItems}
                key="index"
                selectionMode="checkbox"
                selection={selectedVariantItems}
                onSelectionChange={(e) => setSelectedVariantItems(e.value)}
                dataKey="index"
                responsiveLayout="scroll"
                isDataSelectable={isRowSelectable}
                cellClassName={cellClassName}
              >
                <Column
                  selectionMode="multiple"
                  headerStyle={{ width: "3em" }}
                ></Column>
                <Column
                  header="Resim"
                  headerStyle={{ width: "1rem" }}
                  bodyStyle={{ overflow: "visible" }}
                  body={(data, options) => mediasColumnBody(data, options)}
                ></Column>
                <Column field="name" header="Varyant"></Column>
                <Column
                  header="Fiyat"
                  field="price"
                  body={(data, options) =>
                    changeRowVariantPrice(data, options.rowIndex)
                  }
                ></Column>
                <Column
                  header="İndirimli Fiyat"
                  field="discountPrice"
                  body={(data, options) =>
                    changeRowDiscountPrice(data, options.rowIndex)
                  }
                ></Column>
                <Column
                  header="Barkod"
                  field="barcode"
                  body={(data, options) =>
                    changeRowBarcode(data, options.rowIndex)
                  }
                ></Column>
                <Column
                  header="Seçenekler"
                  field="options"
                  body={(data, options) =>
                    onSelectedVariantOptions(data, options.rowIndex)
                  }
                ></Column>
              </DataTable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
