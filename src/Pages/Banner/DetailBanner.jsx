import React, { useEffect, useState, useRef } from 'react'
import bannersService from '../../Manager/Service/bannerService'
import { Button } from 'primereact/button'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import ResponseStatus from '../../Manager/ResponseStatus'
import { InputTextarea } from 'primereact/inputtextarea'
import { Messages } from 'primereact/messages'
import FileUpload from '../../Components/FileUpload/FileUpload'
import { InputSwitch } from 'primereact/inputswitch'
import { Dropdown } from "primereact/dropdown";
const defaultUserFormValues = {
  code: '',
  name: '',
  link: '',
  text: '',
  description: '',
  active: '',
  bannerType:null
}

function DetailBanner() {
  const successMsg = useRef(null)
  const bannerTypes = bannersService.getBannerTypes();
  const [bannerName, setBannerName] = useState()
  const [images, setImages] = useState([]);
  const [galleries, setGalleries] = useState([])
  const [id, setId] = useState()
  const slug = useParams()
  const navigate = useNavigate()
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ defaultUserFormValues })

  useEffect(() => {
    bannersService.getByCode(slug.bannerId).then((result) => {
      setValue('code', result.data.code)
      setValue('name', result.data.name)
      setValue('link', result.data.link)
      setValue('text', result.data.text)
      setValue('active', result.data.active)
      setValue('description', result.data.description)
      setValue('bannerType', bannerTypes.filter(type=>type.code===result.data.bannerType)[0])
      if (result.data.gallery !== null) {
        setGalleries([result.data.gallery])
      }
      setId(result.data.id)
      setBannerName(result.data.name)
    })
  }, [])
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    )
  }
  const accept = (newData) => {
    var data={...newData};
    data.bannerType = newData.bannerType.code;
    data.id = id
    data.gallery = galleries.length >0 ? galleries[0]:null;
    data.file = images.length>0 ? images[0]:null;
    bannersService.updateBanners(data).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        navigate(-1)
      }
    })
  }
  const reject = () => {
    navigate(-1)
  }
  const SaveConfirm = () => {
    confirmDialog({
      message: 'Banner kaydediliyor. Emin misiniz?',
      header: 'İşlem Onay',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: handleSubmit((data) => accept(data)),
      reject,
    })
  }

  /* const deleteConfirm = () => {
    confirmDialog({
      message: 'Banner siliniyor. Emin misiniz?',
      header: 'İşlem Onay',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: handleSubmit((data) => deleteBanner(data)),
      reject,
    })
  }
  const deleteBanner = (data) => {
    bannersService.deleteBanners(data.code).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        navigate(-1)
      }
    })
  } */

  const setImagesUpdate = (data) => {
    setImages(data);

    if(galleries.length>0){
      setGalleries([]);
    }
  }
  return (
    <div className="grid">
      <div className="col-12">
        <Messages ref={successMsg}></Messages>
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <ConfirmDialog />
            <h5>@{bannerName && bannerName}</h5>
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
              </span>
            </div>
          </div>

          <div className="flex justify-content-between mb-2 align-items-center">
            <form className="p-fluid grid formgrid w-full">
              <div className="field md:col-6 col-6">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Zorunlu alan.' }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className={classNames({
                          'p-error': errors.name,
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
                          'p-invalid': fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage('name')}
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
                    options={bannerTypes}
                    //onChange={data=>field.onChange(data)}
                    optionLabel="name"
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
              <div className="field md:col-6 col-6">
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: 'Zorunlu alan.' }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.description}
                        className={classNames({
                          'p-error': errors.description,
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
                          'p-invalid': fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage('description')}
              </div>
              <div className="field md:col-6 col-6">
                <Controller
                  name="text"
                  control={control}
                  rules={{ required: 'Zorunlu alan.' }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.text}
                        className={classNames({
                          'p-error': errors.text,
                        })}
                      >
                        Buton metni
                      </label>
                      <InputText
                        placeholder="Buton metni"
                        id={field.text}
                        {...field}
                        autoFocus
                        className={classNames({
                          'p-invalid': fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage('text')}
              </div>
              <div className="field md:col-6 col-6">
                <Controller
                  name="link"
                  control={control}
                  rules={{ required: 'Zorunlu alan.' }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.link}
                        className={classNames({ 'p-error': errors.link })}
                      >
                        Yönlendirme linki
                      </label>
                      <InputText
                        placeholder="Link"
                        id={field.link}
                        {...field}
                        autoFocus
                        className={classNames({
                          'p-invalid': fieldState.invalid,
                        })}
                      />
                    </>
                  )}
                />
                {getFormErrorMessage('link')}
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
                          'p-error': errors.active,
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
                <FileUpload
                  galleries={galleries}
                  setGalleries={(data)=>setGalleries(data)}
                  images={images}
                  setImages={(data) => setImagesUpdate(data)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailBanner
