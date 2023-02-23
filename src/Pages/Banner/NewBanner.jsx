import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import bannerService from "../../Manager/Service/bannerService";
import { useNavigate } from "react-router-dom";
import ResponseStatus from "../../Manager/ResponseStatus";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputSwitch } from "primereact/inputswitch";
import FileUpload from "../../Components/FileUpload/FileUpload";
import { Toast } from 'primereact/toast';
import { Dropdown } from "primereact/dropdown";
function NewBanner() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [images, setImages] = useState([]);
  const bannerTypes = bannerService.getBannerTypes();
  const defaultValues = {
    name: "",
    description: "",
    text: "",
    link: "",
    active: true,
    bannerType: ""
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    if(images.length <= 0){
      showImageError();
      return;
    }
    var banner = {
      ...data,
      file:images[0]
    }

    bannerService.addBanners(banner).then((result) => {
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
      message: "Banner kaydediliyor. Emin misiniz?",
      header: "İşlem Onay",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      accept: handleSubmit((data) => onSubmit(data)),
      reject,
    });
  };

  const showImageError = () => {
    toast.current.show({severity:'error', summary: 'Hata', detail:'Lütfen resim ekleyiniz.', life: 3000});
  }

  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-12">
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <ConfirmDialog />
            <h5>Banner Ekle</h5>
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
                  rules={{ required: "Başlık alanı zorunludur." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className={classNames({
                          "p-error": errors.name,
                        })}
                      >
                        Başlık
                      </label>
                      <InputText
                        placeholder="Başlık"
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
              name="bannerType"
              control={control}
              rules={{ required: "Kategori zorunludur." }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.bannerType}
                    className={classNames({ "p-error": errors.bannerType })}
                  >
                    Kategori
                  </label>
                  <Dropdown
                    value={field.bannerType}
                    options={bannerTypes}
                    optionLabel="name"
                    optionValue="code"
                    placeholder="Banner Kategorileri"
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
            {getFormErrorMessage("bannerType")}
          </div>
              <div className="field md:col-6 col-12">
                <Controller
                  name="description"
                  control={control}
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
                      <InputText
                        placeholder="Açıklama"
                        id={field.description}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
              </div>
              <div className="field md:col-6 col-12">
                <Controller
                  name="text"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.text}
                        className={classNames({
                          "p-error": errors.text,
                        })}
                      >
                        Buton Metni
                      </label>
                      <InputText
                        placeholder="Buton Metni"
                        id={field.text}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
              </div>
              <div className="field md:col-6 col-12">
                <Controller
                  name="link"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.link}
                        className={classNames({
                          "p-error": errors.link,
                        })}
                      >
                        Link
                      </label>
                      <InputText
                        placeholder="Link"
                        id={field.link}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
              </div>
              <div className="field md:col-6 col-12">
                <Controller
                  name="active"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.active}
                        className={classNames({
                          "p-error": errors.active,
                        })}
                      >
                        Durum
                      </label>
                      <div className="flex align-items-center">
                      <InputSwitch
                        inputId={field.active}
                        onChange={(e) => field.onChange(e.value)}
                        checked={field.value}
                      />
                      </div>
                      
                    </>
                  )}
                />
              </div>
              <div className="field md:col-12 col-12">
                <FileUpload images={images} setImages={(data)=>setImages(data)} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewBanner;
