import React, { useState, useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useService } from '../../Hooks/useService'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { ConfirmDialog } from 'primereact/confirmdialog'
import ResponseStatus from '../../Manager/ResponseStatus'
import bannerService from '../../Manager/Service/bannerService'
import Loading from '../../Components/Loading/Loading'
import { useSelector, useDispatch } from 'react-redux'
import loadingReducer from '../../Manager/Reducers/loadingReducer'
import { Image } from 'primereact/image'
import { classNames } from 'primereact/utils'

function BannerList() {
  const navigate = useNavigate()
  const switchStatus = useSelector((state) => state.loading.isActive)
  const dispatch = useDispatch()

  const [detailSideVisible, setDetailSideVisible] = useState(false)
  const [selectedTagRow, setSelectedTagRow] = useState(false)

  const { data, isLoading, refetch } = useService('banners', () =>
    bannerService.fetchBanners(),
  )
  useEffect(() => {
    dispatch(loadingReducer.actions.setLoading(true))
  }, [])
  const onRowClicked = (data) => {
    setSelectedTagRow(data)
    setDetailSideVisible(true)
  }

  if (!isLoading) {
    dispatch(loadingReducer.actions.setLoading(false))
  }

  const imageBodyTemplate = (rowData) => {
    return (
      <Image
        src={
          rowData.gallery
            ? rowData.gallery.medias.filter(
                (x) => x.mediaFormat.code === 'superzoom',
              )[0].absolutePath
            : 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
        }
        zoomSrc={
          rowData.gallery
            ? rowData.gallery.medias.filter(
                (x) => x.mediaFormat.code === 'superzoom',
              )[0].absolutePath
            : 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
        }
        width="100"
        height="100"
        imageClassName="border-circle surface-border border-1 shadow-1"
        preview
      />
    )
  }

  const verifiedBodyTemplate = (rowData) => {
    return (
      <i
        style={rowData.active ? { color: 'green' } : { color: 'red' }}
        className={classNames('pi', {
          'true-icon pi-check-circle': rowData.active,
          'false-icon pi-times-circle': !rowData.active,
        })}
      ></i>
    )
  }

  return (
    <div className="grid">
      <ConfirmDialog />
      <div className="col-12">
        <div className="card">
          <div className="flex justify-content-between mb-2 align-items-center">
            <h5>Banner</h5>
            <Button
              className="p-button-raised p-button-sm font-bold"
              label="Ekle"
              onClick={() => navigate('new')}
              icon="pi pi-plus font-bold"
            />
          </div>
          <DataTable
            value={data}
            paginator
            rows={10}
            dataKey="id"
            filterDisplay="menu"
            responsiveLayout="scroll"
            emptyMessage="Kayıt bulunamadı"
            rowClassName={'cursor-pointer'}
            rowHover={true}
            onRowClick={(e) => navigate(e.data?.code)}
          >
            <Column body={imageBodyTemplate} header="Görsel"></Column>
            <Column field="name" header="Başlık"></Column>
            <Column field="link" header="Link"></Column>
            <Column
              field="active"
              header="Durumu"
              body={verifiedBodyTemplate}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  )
}

export default BannerList
