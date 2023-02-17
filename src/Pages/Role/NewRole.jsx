import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'primereact/button'
import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import ResponseStatus from '../../Manager/ResponseStatus'
import roleService from '../../Manager/Service/roleService'
import { InputSwitch } from 'primereact/inputswitch'
import { MultiSelect } from 'primereact/multiselect'
import permissionService from '../../Manager/Service/permissionService'
const defaultValues = {
  code: '',
  name: '',
  isActive: false,
}

export default function NewRole({ setNewSideVisible, setSuccessAdded }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isActiveRole, setIsActive] = useState(false)
  const [permissionAll, setPermissionAll] = useState()
  const [permission, setPermission] = useState()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues })
  useEffect(() => {
    permissionService.fetchPermission().then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        setPermissionAll(result.data)
      }
    })
  }, [])
  const onSubmit = (data) => {
    data.isActive = isActiveRole
    data.permissions = permission
    setIsLoading(true)
    roleService
      .addRole(data)
      .then((result) => {
        if (result.status === ResponseStatus.SUCCESS) {
          setNewSideVisible(false)
          setIsLoading(false)
          setSuccessAdded(true)
        }
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    )
  }

  return (
    <div className="grid">
      <div className="col-12">
        <form className="p-fluid grid formgrid">
          <div className="field md:col-12 col-12">
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Birim adı alanı zorunludur.' }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ 'p-error': errors.name })}
                  >
                    Rol
                  </label>
                  <InputText
                    placeholder="Rol adı"
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
            <label>Durumu</label>
            <InputSwitch
              className=""
              checked={isActiveRole}
              onChange={(e) => setIsActive(e.value)}
            />

            {getFormErrorMessage('isActive')}
          </div>
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
  )
}
