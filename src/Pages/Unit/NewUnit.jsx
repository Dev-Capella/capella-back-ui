import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import ResponseStatus from "../../Manager/ResponseStatus";
import unitService from "../../Manager/Service/unitService";

const defaultValues = {
  name: "",
  abbreviation: "",
};

export default function NewTag({ setNewSideVisible, setSuccessAdded }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setIsLoading(true);
    unitService
      .addUnit(data)
      .then((result) => {
        if (result.status === ResponseStatus.SUCCESS) {
          setNewSideVisible(false);
          setIsLoading(false);
          setSuccessAdded(true);
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

  return (
    <div className="grid">
      <div className="col-12">
        <form className="p-fluid grid formgrid">
          <div className="field md:col-12 col-12">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Birim adı alanı zorunludur." }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.name })}
                  >
                    Birim
                  </label>
                  <InputText
                    placeholder="Birim"
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
              name="abbreviation"
              control={control}
              rules={{ required: "Kısaltma adı alanı zorunludur." }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.abbreviation}
                    className={classNames({ "p-error": errors.abbreviation })}
                  >
                    Kısaltma
                  </label>
                  <InputText
                    placeholder="Kısaltma"
                    id={field.abbreviation}
                    {...field}
                    autoFocus
                    className={classNames({ "p-invalid": fieldState.invalid })}
                  />
                </>
              )}
            />
            {getFormErrorMessage("abbreviation")}
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
  );
}
