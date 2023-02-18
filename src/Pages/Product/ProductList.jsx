import React, { useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useQuery } from 'react-query'
import productService from '../../Manager/Service/productService'
import { classNames } from 'primereact/utils'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import './Product.css'
import { useSelector, useDispatch } from 'react-redux'
import loadingReducer from '../../Manager/Reducers/loadingReducer'
export default function ProductList() {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery('products', () =>
    productService.fetchProducts(),
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadingReducer.actions.setLoading(true))
  }, [])
  if (!isLoading) {
    dispatch(loadingReducer.actions.setLoading(false))
  }
  const verifiedBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames('pi', {
          'true-icon pi-check-circle': rowData.active,
          'false-icon pi-times-circle': !rowData.active,
        })}
      ></i>
    )
  }
  const imageBodyTemplate = (rowData) => {
    return (
      <Image
        src={
          rowData.galleries.length > 0
            ? rowData.galleries[0].medias[0].absolutePath
            : 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
        }
        zoomSrc={
          rowData.galleries.length > 0
            ? rowData.galleries[0].medias[1].absolutePath
            : 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
        }
        width="80"
        height="80"
        imageClassName="border-circle surface-border border-1 shadow-1"
        preview
      />
    )
  }

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <h5>Ürün Yönetimi</h5>
            <Button
              className="p-button-raised p-button-sm font-bold"
              onClick={() => navigate('new')}
              label="Ekle"
              icon="pi pi-plus font-bold"
            />
          </div>
          <DataTable
            value={data}
            paginator
            rows={10}
            dataKey="id"
            filterDisplay="menu"
            loading={isLoading}
            responsiveLayout="scroll"
            emptyMessage="Veri tabanında ürün bulunamadı!"
            rowClassName={'cursor-pointer'}
            rowHover={true}
            onRowClick={(e) => navigate(e.data?.code)}
          >
            <Column body={imageBodyTemplate}></Column>
            <Column field="name" header="Ürün"></Column>
            <Column field="price" header="Satış Fiyatı"></Column>
            <Column field="discountedPrice" header="İndirimli Fiyat"></Column>
            <Column
              field="active"
              header="Durum"
              dataType="boolean"
              style={{ minWidth: '8rem' }}
              body={verifiedBodyTemplate}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  )
}
