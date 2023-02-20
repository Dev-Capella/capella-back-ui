import React, {  useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputSwitch } from "primereact/inputswitch";
import { TreeSelect } from "primereact/treeselect";
import { Editor } from "primereact/editor";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import categoryService from "../../../Manager/Service/categoryService";
import brandService from "../../../Manager/Service/brandService";
import supplierService from "../../../Manager/Service/supplierService";
import tagService from "../../../Manager/Service/tagService";
import { useQuery } from "react-query";
import ProductHeader from "./ProductHeader";
import { ProductContext } from "../Context/ProductContext";
import productService from "../../../Manager/Service/productService";
import ResponseStatus from "../../../Manager/ResponseStatus";
import ProductImage from "./ProductImage";
import { useSelector, useDispatch } from "react-redux";
import loadingReducer from "../../../Manager/Reducers/loadingReducer";
export default function ProductForm() {
  const dispatch = useDispatch();
  const {
    productFilesBinary,
    variants,
    variantItems,
    classificationAttributeValues,
  } = useContext(ProductContext);
  const navigate = useNavigate();
  const { data: brandDatas, isLoading: isBrandLoading } = useQuery(
    "brands",
    () => brandService.fetchBrands()
  );

  const { data: supplierDatas, isLoading: isSupplierLoading } = useQuery(
    "suppliers",
    () => supplierService.fetchSuppliers()
  );

  const { data: tagDatas, isLoading: isTagLoading } = useQuery("tags", () =>
    tagService.fetchTag()
  );
  const { data: categories } = useQuery("categories", () =>
    categoryService.fetchCategories()
  );

  const defaultValues = {
    name: "",
    description: "",
    active: true,
    categories: null,
    brand: null,
    tags: null,
    supplier: null,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  //test
  const onSubmit = (data) => {
    dispatch(loadingReducer.actions.setLoading(true));
    const productData = {
      ...data,
      files: productFilesBinary,
      variants: variants,
      variantItems: variantItems,
      classificationAttributeValues: classificationAttributeValues,
      categories: getCategoryCode(Object.keys(data.categories)),
    };
    productService.addProduct(productData).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        navigate(-1);
        dispatch(loadingReducer.actions.setLoading(false));
      }
      dispatch(loadingReducer.actions.setLoading(false));
    });
  };

  const getCategoryCode = (value) => {
    var requestCategory = [];

    if (value) {
      value.forEach((element) => {
        let item = getCategory(categories, element);
        requestCategory.push(item);
      });
      requestCategory = requestCategory.map((x) => {
        return { code: x.data.code };
      });
    }
    return requestCategory;
  };

  const getCategory = (categories, filter) => {
    if (categories.some((x) => x.key === filter)) {
      return categories.filter((x) => x.key === filter)[0];
    } else {
      for (let category of categories) {
        var _category = getCategory(category.children, filter);
        if (_category) {
          return _category;
        }
      }
      return null;
    }
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div>
      <ProductHeader
        handleSubmit={handleSubmit}
        submit={(data) => onSubmit(data)}
      />
      <form className="p-fluid formgrid">
        <div className="card shadow-1">
          <span className="text-xl font-bold">Temel Bilgi</span>
          <div className="grid mt-3">
            <div className="field md:col-6 col-12">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Ürün adı zorunludur." }}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className={classNames({ "p-error": errors.name })}
                    >
                      Ürün
                    </label>
                    <InputText
                      placeholder="Ürün"
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

            <div className="field md:col-3 col-12">
              <Controller
                name="active"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.active}
                      className={classNames({ "p-error": errors.active })}
                    >
                      Durum
                    </label>
                    <div className="flex align-items-center">
                      <InputSwitch
                        inputId={field.isActive}
                        onChange={(e) => field.onChange(e.value)}
                        checked={field.value}
                      />
                    </div>
                  </>
                )}
              />
              {getFormErrorMessage("active")}
            </div>
          </div>
          {variants?.length === 0 && (
            <div className="field md:col-12 col-12">
              <ProductImage />
            </div>
          )}
        </div>

        <div className="card shadow-1">
          <span className="text-xl font-bold">Ürün Detayı</span>
          <div className="grid mt-3">
            <div className="field md:col-4 col-12">
              <Controller
                name="brand"
                control={control}
                rules={{ required: "Marka seçimi zorunludur." }}
                render={({ field, fieldState }) => (
                  <>
                    <label className={classNames({ "p-error": errors.brand })}>
                      Marka
                    </label>
                    <Dropdown
                      value={field.value}
                      optionLabel="name"
                      placeholder="Marka Seçin"
                      name="code"
                      isLoading={isBrandLoading}
                      options={brandDatas}
                      control={control}
                      appendTo="self"
                      onChange={(e) => field.onChange(e.value)}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                  </>
                )}
              />
              {getFormErrorMessage("brand")}
            </div>
            <div className="field md:col-4 col-12">
              <Controller
                name="tags"
                control={control}
                rules={{ required: "Etiket seçimi zorunludur." }}
                render={({ field, fieldState }) => (
                  <>
                    <label className={classNames({ "p-error": errors.tags })}>
                      Etiket
                    </label>
                    <MultiSelect
                      value={field.value}
                      control={control}
                      options={tagDatas}
                      isLoading={isTagLoading}
                      onChange={(e) => field.onChange(e.value)}
                      name="code"
                      display="chip"
                      optionLabel="name"
                      placeholder="Etiket Seçin"
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      appendTo="self"
                    />
                  </>
                )}
              />
              {getFormErrorMessage("tags")}
            </div>
            <div className="field md:col-4 col-12">
              <Controller
                name="supplier"
                control={control}
                rules={{ required: "Tedarikçi seçimi zorunludur." }}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      className={classNames({ "p-error": errors.supplier })}
                    >
                      Tedarikçi
                    </label>
                    <Dropdown
                      value={field.value}
                      optionLabel="name"
                      placeholder="Tedarikçi Seçin"
                      name="code"
                      isLoading={isSupplierLoading}
                      options={supplierDatas}
                      control={control}
                      onChange={(e) => field.onChange(e.value)}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      appendTo="self"
                    />
                  </>
                )}
              />
              {getFormErrorMessage("supplier")}
            </div>
            <div className="field md:col-12 col-12">
              <Controller
                name="categories"
                control={control}
                rules={{ required: "Kategori seçimi zorunludur." }}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      className={classNames({
                        "p-error": errors.categories,
                      })}
                    >
                      Kategoriler
                    </label>
                    <TreeSelect
                      display="chip"
                      value={field.value}
                      options={categories}
                      metaKeySelection={false}
                      selectionMode="multiple"
                      id={field.categories}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      onChange={(e) => field.onChange(e)}
                      appendTo="self"
                    />
                  </>
                )}
              />
              {getFormErrorMessage("categories")}
            </div>
            <div className="field md:col-12 col-12">
              <Controller
                name="description"
                control={control}
                rules={{ required: "Açıklama zorunludur." }}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.description}
                      className={classNames({
                        "p-error": errors.description,
                      })}
                    >
                      Açıklama
                    </label>

                    <Editor
                      id={field.description}
                      name="description"
                      value={field.value}
                      onTextChange={(e) => field.onChange(e.textValue)}
                      style={{ height: "320px" }}
                    />
                  </>
                )}
              />
              {getFormErrorMessage("description")}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
