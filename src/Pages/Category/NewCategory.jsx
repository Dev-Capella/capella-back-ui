import React, {  useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { TreeSelect } from 'primereact/treeselect';
import { useQuery } from 'react-query';
import { InputSwitch } from 'primereact/inputswitch';
import categoryService from '../../Manager/Service/categoryService';
import { useNavigate } from 'react-router-dom';
import ResponseStatus from '../../Manager/ResponseStatus'

export default function NewCategory() {
    const navigate = useNavigate();
    const [rootCategory, setRootCategory] = useState(false);
    const {data} = useQuery("categories", () => categoryService.fetchCategories());
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    
    const defaultValues = {
        name: '',
        description: '',
        root: false
    }

    const { control, formState: { errors }, handleSubmit } = useForm({ defaultValues });

    const onSubmit = (data) => {

        if(!rootCategory){
            data.parentCategory={code:selectedNode};
        }else{
            data.parentCategory=null;
        }

        categoryService.addCategory(data).then(result=>{
            if(result.status === ResponseStatus.Success){
                navigate(-1);
            }
        })

    };

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  return (
    
    <div className="grid">
        
        <div className="col-12">
            
            <div className="card">
            <div className="flex justify-content-between mb-2 align-items-center">
                <h5>Kategori Ekle</h5>
                <span className="p-buttonset">
                    <Button className="p-button-sm font-bold" label="Save" icon="pi pi-check" onClick={handleSubmit((data) => onSubmit(data))}/>
                    <Button className="p-button-sm font-bold" label="Cancel" icon="pi pi-times" onClick={()=> navigate(-1)}/>
                </span>
                
            </div>
            <div className="surface-border border-top-1 opacity-100 mt-3 mb-3 col-12"></div>

            <form className="p-fluid grid formgrid">
                <div className="field md:col-6 col-12">
                    <Controller name="name" control={control} rules={{ required: 'Kategori zorunludur.' }} render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.name })}>Kategori</label>
                            <InputText placeholder="Kategori" id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                        </>
                    )} />
                    {getFormErrorMessage('name')}
                </div>
                <div className="field md:col-6 col-12">
                    <Controller name="description" control={control} render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.description} className={classNames({ 'p-error': errors.description })}>Açıklama</label>
                            <InputText placeholder="Açıklama" id={field.description} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                        </>
                    )} />
                    {getFormErrorMessage('description')}
                </div>
               
                
                <div className="field md:col-12 col-12">
                    <label>Ana Kategori</label>
                    <div className='flex align-items-center mt-2'>
                    <InputSwitch checked={rootCategory} onChange={(e) => setRootCategory(e.value)}/>
                    </div>
                </div>

                {!rootCategory &&
                    (
                    <div className="field md:col-6 col-12">
                        <label>Üst Kategori</label>
                        <TreeSelect value={selectedNodeKey} onChange={(e) => setSelectedNodeKey(e.value)} options={data} onNodeSelect={(e) => setSelectedNode(e.node.data.code)} filter placeholder="Select Item"></TreeSelect>
                    </div>
                )}
            </form>
            </div>
        </div>
    </div>
  )
}
