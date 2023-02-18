import React, { useState, useEffect } from 'react'
import { TreeTable } from 'primereact/treetable'
import { Column } from 'primereact/column'
import { useQuery } from 'react-query'
import { Button } from 'primereact/button'
import categoryService from '../../Manager/Service/categoryService'
import { useNavigate } from 'react-router-dom'
import { Tree } from 'primereact/tree'
import { useSelector, useDispatch } from 'react-redux'
import loadingReducer from '../../Manager/Reducers/loadingReducer'
export default function Category() {
  const [editMode, setEditMode] = useState(false)
  const { data, isLoading, refetch } = useQuery('categories', () =>
    categoryService.fetchCategories(),
  )
  const navigate = useNavigate()
  const [isAddLoading, setIsAddLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadingReducer.actions.setLoading(true))
  }, [])
  if (!isLoading) {
    dispatch(loadingReducer.actions.setLoading(false))
  }
  const setNodes = (event) => {
    const sourceCode = event.dragNode.data.code

    const destinationCode = event.dropNode ? event.dropNode.data.code : null

    let finalLevel = event.dropIndex + 1

    if (
      event.dragNode?.data.level < event.dropIndex &&
      event.dragNode?.key.substring(0, event.dragNode?.key.length - 2) ===
        event.dropNode?.key
    ) {
      finalLevel--
    } else if (
      event.dragNode?.data.level < event.dropIndex &&
      event.dropNode == null &&
      event.dragNode?.key.length === 1
    ) {
      finalLevel--
    }

    if (event.dragNode?.key.length === 1 && event.dropNode?.key.length === 1) {
      finalLevel = 1
    }

    if (
      event.dragNode?.key.includes('-') &&
      event.dropNode != null &&
      event.dragNode?.key.substring(0, event.dragNode?.key.length - 2) !==
        event.dropNode?.key
    ) {
      finalLevel = 1
    }

    const categoryReorderDto = {
      sourceCode,
      destinationCode,
      level: finalLevel,
    }
    setIsAddLoading(true)
    categoryService.reOrderCategory(categoryReorderDto).then((result) => {
      if (result) {
        refetch()
      }
      setIsAddLoading(false)
    })
  }

  return (
    <>
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <div className="flex justify-content-between mb-2 align-items-center">
              <h5>Kategoriler</h5>
              <div>
                <Button
                  className="p-button-raised p-button-sm font-bold mr-3"
                  onClick={() => setEditMode(!editMode)}
                  label={!editMode ? 'Sırala' : 'Kaydet'}
                  icon="pi pi-arrows-alt"
                />
                <Button
                  className="p-button-raised p-button-sm font-bold"
                  onClick={() => navigate('new')}
                  disabled={editMode}
                  label="Ekle"
                  icon="pi pi-plus font-bold"
                />
              </div>
            </div>
            {!editMode ? (
              <TreeTable value={data} loading={isLoading}>
                <Column field="name" header="Kategori" expander></Column>
                <Column field="description" header="Açıklama"></Column>
              </TreeTable>
            ) : (
              <Tree
                value={data}
                loading={isAddLoading}
                dragdropScope="demo"
                onDragDrop={(event) => setNodes(event)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
