import React, { useEffect, useState, useRef } from 'react'
import { Button } from 'primereact/button'
import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import ResponseStatus from '../../Manager/ResponseStatus'
import roleService from '../../Manager/Service/roleService'

import { Messages } from 'primereact/messages'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { InputSwitch } from 'primereact/inputswitch'
import { useNavigate } from 'react-router-dom'
import { MultiSelect } from 'primereact/multiselect'
const defaultValues = {
  id: '',
  code: '',
  name: '',
  isActive: '',
}

export default function DetailRole({ code, setSideVisible, permissionAll }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isActiveRole, setIsActive] = useState(false)
  const [permission, setPermission] = useState([])
  const msg = useRef(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({ defaultValues })

  useEffect(() => {
    roleService.getByRoleId(code).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        setValue('id', result.data.id)
        setValue('code', result.data.code)
        setValue('name', result.data.name)
        setPermission(result.data.permissions)
        setIsActive(result.data.isActive)
      }
    })
  }, [])

  const onSubmit = (data) => {
    setIsLoading(true)
    data.permissions = permission
    data.isActive = isActiveRole
    roleService
      .updateRole(data)
      .then((result) => {
        console.log(result)
        if (result.status === ResponseStatus.SUCCESS) {
          setSideVisible(false)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }

  const deleteRole = (code, name) => {
    setIsLoading(true)
    roleService.deleteRole(code).then((result) => {
      console.log(code)
      console.log(result.status)
      if (result.status === ResponseStatus.SUCCESS) {
        setSideVisible(false)
        setIsLoading(false)
      }
    })
  }

  const deleteConfirm = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Birim siliniyor. Emin misiniz?',
      header: 'İşlem Onay',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',

      accept: () => deleteRole(code, getValues('name')),
      reject,
    })
  }

  const reject = () => {}

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    )
  }
  const rolePermissionHandler = (e) => {
    console.log(e)
    const data = permissionAll.filter(
      (item) => item.name === e.value[e.value.length - 1],
    )
    setPermission([...permission, ...data])
  }
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
              rules={{ required: 'Birim Adı alanı zorunludur.' }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ 'p-error': errors.name })}
                  >
                    Rol
                  </label>
                  <InputText
                    placeholder="Birim İsmi"
                    id={field.name}
                    {...field}
                    autoFocus
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                </>
              )}
            />
            {getFormErrorMessage('name')}
          </div>
          <div className="field md:col-12 col-12">
            <label>İzinler</label>
            <MultiSelect
              display="chip"
              optionLabel="description"
              value={permission}
              options={permissionAll}
              onChange={(e) => setPermission(e.value)}
            />

            {getFormErrorMessage('name')}
          </div>
          <div className="field md:col-12 col-12 flex flex-column">
            <label className={classNames({ 'p-error': errors.abbreviation })}>
              Durum
            </label>
            <InputSwitch
              checked={isActiveRole}
              onChange={(e) => setIsActive(e.value)}
            />

            {getFormErrorMessage('abbreviation')}
          </div>
          <div className="absolute left-0 bottom-0 mb-3 ml-3">
            <Button
              className="p-button-outlined p-button-danger"
              icon="pi pi-trash"
              label="Sil"
              type="button"
              loading={isLoading}
              onClick={(event) => {
                deleteConfirm(event)
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
  )
}
