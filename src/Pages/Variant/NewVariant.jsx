import React, { useState } from "react";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Chips } from "primereact/chips";
import ResponseStatus from "../../Manager/ResponseStatus";
import variantService from "../../Manager/Service/variantService";

const defaultValues = {
  name: "",
  variantValues: [],
};

export default function NewVariant({ setNewSideVisible }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setIsLoading(true);
    if (data.variantValues.length > 0) {
      data.variantValues = data.variantValues.map((x) => {
        return { name: x };
      });
    }

    variantService
      .addVariant(data)
      .then((result) => {
        if (result.status === ResponseStatus.SUCCESS) {
          setNewSideVisible(false);
          setIsLoading(false);
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
        <div className="surface-border border-top-1 opacity-100 mt-3 mb-3 col-12"></div>
        <form className="p-fluid grid formgrid">
          <div className="field md:col-12 col-12">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Varyant Adı alanı zorunludur." }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.name })}
                  >
                    Varyant Adı
                  </label>
                  <InputText
                    placeholder="Varyant İsmi"
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
              name="variantValues"
              control={control}
              rules={{ required: "Varyant Değerleri zorunludur." }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.variantValues}
                    className={classNames({ "p-error": errors.variantValues })}
                  >
                    Seçenekler
                  </label>
                  <Chips
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    className={classNames({
                      "p-invalid": fieldState.invalid,
                    })}
                  />
                </>
              )}
            />
            {getFormErrorMessage("variantValues")}
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
