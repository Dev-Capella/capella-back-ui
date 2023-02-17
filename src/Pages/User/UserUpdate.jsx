import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import { useQuery } from "react-query";
import { classNames } from "primereact/utils";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import roleService from "../../Manager/Service/roleService";
import userService from "../../Manager/Service/userService";
import { ListBox } from "primereact/listbox";
import { Calendar } from "primereact/calendar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "../../styles/layout/_userupdate.scss";
import ResponseStatus from "../../Manager/ResponseStatus";
const defaultUserFormValues = {
  id: "",
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  birthDate: new Date(),
  isActive: false,
  isDeleted: false,
};

export default function UserUpdate() {
  const [selectPermission, setSelectPermission] = useState();
  const [selectedRoles, setSelectedRoles] = useState(null);
  const [roles, setRoles] = useState(null);
  const slug = useParams();
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ defaultUserFormValues });

  useEffect(() => {
    //Fetching Get User By UserName
    userService.getUserByName(slug.username).then((result) => {
      setValue("id", result.id);
      setValue("username", result.username);
      setValue("firstname", result.firstname);
      setValue("lastname", result.lastname);
      setValue("email", result.email);
      setValue("password", result.password);
      setValue("birthDate", new Date(result.birthDate));
      setValue("isActive", result.isActive);
      setValue("isDeleted", result.isDeleted);
      setSelectedRoles(result.roles);
    });

    //Fetching All Roles
    roleService.getRoles().then((result) => {
      setRoles(result);
    });
  }, []);

  useEffect(() => {
    if (selectedRoles != null) {
      const rolesMap = selectedRoles.map((item) => {
        const datam = {
          label: item.code,
          code: item.code,
          items: [...item.permissions],
        };
        return datam;
      });

      setSelectPermission(rolesMap);
    }
  }, [selectedRoles]);

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const accept = (data) => {
    data.roles = selectedRoles.map((x) => {
      return { id: x.id, name: x.name, code: x.code };
    });
    userService.updateUser(data).then((result) => {
      if (result.status === ResponseStatus.SUCCESS) {
        navigate(-1);
      }
    });
  };

  const reject = () => {};
  const confirm1 = () => {
    confirmDialog({
      message: "Kullanıcı kaydediliyor. Emin misiniz?",
      header: "İşlem Onay",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Evet",
      rejectLabel: "Hayır",
      accept: handleSubmit((data) => accept(data)),
      reject,
    });
  };
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <ConfirmDialog />
            <h5>@{slug.username}</h5>
            <div>
              <span className="p-buttonset">
                <Button
                  className="p-button-sm font-bold"
                  label="Kaydet"
                  icon="pi pi-check"
                  onClick={confirm1}
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

          <form className="p-fluid grid formgrid">
            <div className="field md:col-6 col-12">
              <Controller
                name="username"
                control={control}
                rules={{ required: "Kullanıcı adı zorunludur." }}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.username}
                      className={classNames({ "p-error": errors.username })}
                    >
                      Kullanıcı Adı
                    </label>
                    <InputText
                      placeholder="Kategori"
                      id={field.username}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  </>
                )}
              />
              {getFormErrorMessage("username")}
            </div>
            <div className="field md:col-6 col-12">
              <Controller
                name="firstname"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.firstname}
                      className={classNames({ "p-error": errors.firstname })}
                    >
                      İsim
                    </label>
                    <InputText
                      placeholder="Açıklama"
                      id={field.firstname ? "b" : "a"}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  </>
                )}
              />
              {getFormErrorMessage("firstname")}
            </div>
            <div className="field md:col-6 col-12">
              <Controller
                name="lastname"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.lastname}
                      className={classNames({ "p-error": errors.lastname })}
                    >
                      Soyisim
                    </label>
                    <InputText
                      placeholder="Açıklama"
                      id={field.lastname ? "b" : "a"}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  </>
                )}
              />
              {getFormErrorMessage("lastname")}
            </div>
            <div className="field md:col-6 col-12">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.description}
                      className={classNames({ "p-error": errors.description })}
                    >
                      E-posta
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
              {getFormErrorMessage("description")}
            </div>
            <div className="field md:col-6 col-12">
              <Controller
                name="birthDate"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.description}
                      className={classNames({ "p-error": errors.description })}
                    >
                      Doğum Tarihi
                    </label>

                    <Calendar
                      id={field.birthDate}
                      showIcon
                      {...field}
                      dateFormat="dd.mm.yy"
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />

                    {/* <InputText
                      placeholder="Açıklama"
                      id={field.description}
                      {...field}
                      autoFocus
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                      })}
                    /> */}
                  </>
                )}
              />
              {getFormErrorMessage("description")}
            </div>
            <div className="field md:col-6 col-6">
              <label>Kullanıcı Durumu</label>
              <div className="flex align-items-center mt-2">
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <InputSwitch
                        inputId={field.isActive}
                        onChange={(e) => field.onChange(e.value)}
                        checked={field.value}
                      />
                    </>
                  )}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="card">
          <div className="field md:col-6 col-12">
            <label>Roller</label>
            <div className="flex align-items-center mt-2">
              <MultiSelect
                display="chip"
                className="w-screen"
                value={selectedRoles}
                options={roles}
                onChange={(e) => setSelectedRoles(e.value)}
                optionLabel="name"
                placeholder="Roller"
              />
            </div>
          </div>
          <div className="field md:col-12 col-12">
            <label>İzinler</label>

            <div className="flex align-items-center mt-2 ">
              <ListBox
                style={{ width: "50rem" }}
                listStyle={{ maxHeight: "250px" }}
                placeholder="İzinler"
                options={selectPermission}
                optionLabel="name"
                optionGroupLabel="label"
                optionGroupChildren="items"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
